'use server';

import prisma from '@/prisma/db';
import { getKindeUser } from './users';

import { pc } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

// const embeddings = new OpenAIEmbeddings();
// const pineconeIndex = pc.index(process.env.PINECONE_INDEX!);

// export async function continueConversation(messages: CoreMessage[], fileId: string) {

//     const user = await getKindeUser();

//     if (!user?.id)
//         return { error: "Unauthorized", status: 401 };

//     const userId = user.id;

//     const existingFile = await getFileFromDb(fileId);

//     if (!existingFile)
//         return { error: "File not found!", status: 404 };

//     const currentMessage = messages.pop();

//     if (!currentMessage)
//         return { error: "Invalid message", status: 404 };

//     // await prisma.message.create({
//     //     data: {
//     //         text: currentMessage.content as string,
//     //         isUserMessage: currentMessage.role === 'user' ? true : false,
//     //         userId: userId,
//     //         fileId: fileId
//     //     },
//     // });

//     // vectorize incoming user message
//     const vectorStore = await PineconeStore.fromExistingIndex(
//         embeddings,
//         {
//             pineconeIndex: pineconeIndex,
//             namespace: fileId
//         }
//     );
//     const similarityResults = await vectorStore.similaritySearch(currentMessage.content as string, 5); // we want 4 pages closest context  

//     // const result = await streamText({
//     //     model: openai('gpt-3.5-turbo'),
//     //     messages,
//     // });

//     const result = await streamText({
//         model: openai('gpt-3.5-turbo'),
//         messages: [
//           {
//             role: 'system',
//             content:
//               'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
//           },
//           {
//             role: 'user',
//             content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
            
//             \n----------------\n
            
//             PREVIOUS CONVERSATION:
//             ${messages.map((message) => {
//                 if (message.role === 'user')
//                 return `User: ${message.content}\n`
//                 return `Assistant: ${message.content}\n`
//             })}
            
//             \n----------------\n
            
//             CONTEXT:
//             ${similarityResults.map((r) => r.pageContent).join('\n\n')}
            
//             USER INPUT: ${currentMessage}`
//           }
//         ]
//     });

//     const stream = createStreamableValue(result.textStream)
//     return stream.value
// }

export async function getFileMessages(fileId: string) {
    const user = await getKindeUser();

    if (!user?.id)
        return null;

    return await prisma.message.findMany({
        where: { fileId: fileId}
    })

}