"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { getDbUserByKindeId } from "./users";

export async function getUserFiles() {
    
    const userFromDatabase = await getDbUserByKindeId();

    if (!userFromDatabase) return null;

    return await prisma.file.findMany({
        where: { userId: userFromDatabase.id }
    })
}

export async function deleteFileById(fileId: string) {
    try {
        const userFromDatabase = await getDbUserByKindeId();

        if (!userFromDatabase)
            return { error: "Unauthorized.", status: 401}

        const deletedFile = await prisma.file.delete({
            where: { id: fileId, userId: userFromDatabase.id}
        })

        if (!deletedFile)
            return { error: "Internal Server Error.", status: 500}
        
        revalidatePath('/dashboard');

        return { success: "File deleted successfully.", status: 200}
    } catch {
        return { error: "Internal Server Error.", status: 500}
    }
    

    
}