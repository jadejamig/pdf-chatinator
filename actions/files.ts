"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { getKindeUser } from "./users";
// import { getDbUserByKindeId } from "./users";

export async function getUserFiles() {
    
    const user = await getKindeUser();

    if (!user) return null;

    return await prisma.file.findMany({
        where: { userId: user.id }
    })
}

export async function deleteFileById(fileId: string) {
    try {
        const user = await getKindeUser();

        if (!user)
            return { error: "Unauthorized.", status: 401}

        const deletedFile = await prisma.file.delete({
            where: { id: fileId, userId: user.id}
        })

        if (!deletedFile)
            return { error: "Internal Server Error.", status: 500}
        
        revalidatePath('/dashboard');

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