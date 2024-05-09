"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { getUserByKindeId } from "./users";

export async function getUserFiles() {
    
    const userFromDatabase = await getUserByKindeId();

    if (!userFromDatabase) return null;

    return await prisma.file.findMany({
        where: { userId: userFromDatabase.id }
    })
}

export async function deleteFileById(fileId: string) {
    try {
        const userFromDatabase = await getUserByKindeId();

        if (!userFromDatabase)
            return { error: "Internal Server Error.", status: 500}

        await prisma.file.delete({
            where: { id: fileId, userId: userFromDatabase.id}
        })
        
        revalidatePath('/', 'layout')

        console.log("file successfully deleted")
        return { success: "File deleted successfully.", status: 200}
    } catch {
        return { error: "Internal Server Error.", status: 500}
    }
    

    
}