import { getFileFromDb } from "@/actions/files";
import { getKindeUser } from "@/actions/users";
import { openai } from "@/lib/openai";
import { pc } from "@/lib/pinecone";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import prisma from "@/prisma/db";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { NextRequest, NextResponse } from "next/server";
import { StreamingTextResponse, streamText, OpenAIStream } from 'ai';

export const POST = async (req: NextRequest) => {

    const user = await getKindeUser();

    if (!user?.id)
        return new NextResponse("Unauthorized", { status: 401 });

    const userId = user.id;

    const body = await req.json();

    const { fileId, message} = SendMessageValidator.parse(body);

    const existingFile = await getFileFromDb(fileId);

    if (!existingFile)
        return new NextResponse("File not found!", { status: 404 });

    await prisma.message.create({
        data: {
            text: message,
            isUserMessage: true,
            userId: userId,
            fileId: fileId
        },
    });

    // vectorize incoming user message
    const embeddings = new OpenAIEmbeddings();
    
    const pineconeIndex = pc.index(process.env.PINECONE_INDEX!);

    const vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        {
            pineconeIndex: pineconeIndex,
            namespace: fileId
        }
    );
    const results = await vectorStore.similaritySearch(message, 4); // we want 4 pages closest context

    const prevMessages = await prisma.message.findMany({
        where: { fileId: fileId },
        orderBy: { createdAt: 'asc'},
        take: 6
    });

    const formattedPrevMessages = prevMessages.map((message) => (
        {
            role: message.isUserMessage ? "user" : "assistant",
            content: message.text
        }
    ));

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0,
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
            ${formattedPrevMessages.map((message) => {
                if (message.role === 'user')
                return `User: ${message.content}\n`
                return `Assistant: ${message.content}\n`
            })}
            
            \n----------------\n
            
            CONTEXT:
            ${results.map((r) => r.pageContent).join('\n\n')}
            
            USER INPUT: ${message}`
          }
        ]
    });

    const stream = OpenAIStream(response, {
        async onCompletion(completion) {
            await prisma.message.create({
                data: {
                    text: completion,
                    isUserMessage: false,
                    fileId: fileId,
                    userId: userId
                }
            })
        }
    });

    return new StreamingTextResponse(stream);
}