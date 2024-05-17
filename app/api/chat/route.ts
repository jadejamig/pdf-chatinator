import { getKindeUser } from '@/actions/users';
import { CoreMessage, OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

import { authorizePrompt } from '@/actions/prompt';
import { pc } from "@/lib/pinecone";
import prisma from '@/prisma/db';
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { NextResponse } from 'next/server';

const openai = new OpenAI();

export async function POST(req: Request) {

    const { messages } = await req.json() as { messages: CoreMessage[] };

    const headers = new Headers(req.headers);
    const fileId = headers.get('fileId');

    if (!fileId)
        return NextResponse.json("Bad request", {status: 400})

    const user = await getKindeUser();

    if (!user)
        return NextResponse.json("Unauthorized user", {status: 401})

    const userId = user.id;

    //
    const authorize = await authorizePrompt(userId);

    if (!authorize)
        return NextResponse.json("Bad request", {status: 400, headers: { message: "Try again tomorrow, you're making me broke my friend :("}})
    //

    const currentMessage = messages.pop();
    
    if (!currentMessage)
        return NextResponse.json("Invalid message", {status: 400})

    await prisma.message.create({
        data: {
            text: currentMessage.content as string,
            isUserMessage: currentMessage.role === 'user' ? true : false,
            userId: userId,
            fileId: fileId
        },
    });

    const embeddings = new OpenAIEmbeddings();

    const pineconeIndex = pc.index(process.env.PINECONE_INDEX!);

    // vectorize incoming user message
    const vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        {
            pineconeIndex: pineconeIndex,
            namespace: fileId
        }
    );

    const similarityResults = await vectorStore.similaritySearch(currentMessage.content as string, 5); // we want 4 pages closest context  


    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
          {
            role: 'system',
            content:
              'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
          },
          {
            role: 'user',
            content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
            
            \n----------------\n
            
            PREVIOUS CONVERSATION:
            ${messages.map((message) => {
                if (message.role === 'user')
                return `User: ${message.content}\n`
                return `Assistant: ${message.content}\n`
            })}
            
            \n----------------\n
            
            CONTEXT:
            ${similarityResults.map((r) => r.pageContent).join('\n\n')}
            
            USER INPUT: ${currentMessage.content}`
          }
        ]
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
        async onFinal(completion) {
            await prisma.message.create({
                data: {
                    text: completion,
                    isUserMessage: false,
                    userId: userId,
                    fileId: fileId
                },
            })
        },
    });

    return new StreamingTextResponse(stream);
}

export const maxDuration = 30;