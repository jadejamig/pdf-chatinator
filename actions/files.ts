"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { getKindeUser } from "./users";
import { UTApi } from "uploadthing/server";
// import { getDbUserByKindeId } from "./users";

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
            console.log("No deleted file")
            return { error: "Internal Server Error.", status: 500}
        }
            
        // Delete file in UploadThings
        const { success } = await utApi.deleteFiles(key)

        if (!success)
            return { error: "Internal Server Error.", status: 500}

        // revalidatePath('/dashboard');

        return { success: "File deleted successfully.", status: 200}
    } catch {
        return { error: "Internal Server Error.", status: 500}
    }
}

export async function getFileFromDb(id: string ) {
    const user = await getKindeUser();

    if (!user) return null;

    return await prisma.file.findUnique({
        where: { id: id }
    })
}