"use server";

import prisma from "@/prisma/db";
import { UTApi } from "uploadthing/server";
import { getKindeUser } from "./users";
// import { getDbUserByKindeId } from "./users";
const MESSAGE_LIMIT = 10

export async function getUserFiles() {
    
    const user = await getKindeUser();

    if (!user) return null;

    return await prisma.file.findMany({
        where: { userId: user.id }
    })
}

export async function deleteFileById(key: string) {
    try {

        const user = await getKindeUser();

        if (!user)
            return { error: "Unauthorized.", status: 401}


        const utApi = new UTApi();
 
        // Delete file from DB
        const deletedFile = await prisma.file.delete({
            where: { key: key }
        })

        if (!deletedFile) {
            return { error: "Internal Server Error.", status: 500}
        }
            
        // Delete file in UploadThings
        const { success } = await utApi.deleteFiles(key)

        if (!success)
            return { error: "Internal Server Error.", status: 500}

        return { success: "File deleted successfully.", status: 200}
    } catch {
        return { error: "Internal Server Error.", status: 500}
    }
}

export async function getFileFromDb(id: string ) {
    return await prisma.file.findUnique({
        where: { id: id }
    })
}

// export async function getFileMessages(fileId: string, cursor: string | undefined, limit: number) {
//     const user = await getKindeUser();

//     if (!user) return null;

//     const messages = await prisma.message.findMany({
//         where: { fileId: fileId},
//         orderBy: { createdAt: 'desc' },
//         take: MESSAGE_LIMIT + 1,
//         cursor: cursor ? { id: cursor } : undefined,
//         select: { id: true, isUserMessage: true, createdAt: true, text: true}
//     });

//     let nextCursor: string | undefined = undefined;
//     if (messages.length > MESSAGE_LIMIT) {
//         const nextItem = messages.pop();
//         nextCursor = nextItem?.id
//     }

//     return { messages, nextCursor };
// }