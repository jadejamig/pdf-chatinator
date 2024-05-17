import prisma from "@/prisma/db";
import { count } from "console";
import { getKindeUser } from "./users";


export async function createPrompt(userId: string) {

    await prisma.prompt.deleteMany({
        where: { userId: userId }
    });

    await prisma.prompt.create({
        data: { userId: userId, count: 1 }
    });
}

export async function getPrompt(userId: string) {
    return await prisma.prompt.findFirst({
        where: { userId: userId }
    })
}

export async function authorizePrompt(userId: string) {

    const prompt = await getPrompt(userId)

    if (!prompt) {
        await createPrompt(userId)
        return true
    }

    const isExpired = (Date.now() - prompt.createdAt.getTime()) >= ( 1000 * 60 * 60 * 24 ) // 1 Day
  
    if (isExpired) {
        await createPrompt(userId)
        return true
    } 

    if (prompt.count >= 5)
        return false

    await prisma.prompt.update({
        where: { id: prompt.id },
        data: { count: prompt.count + 1 }
    })
    
    return true

}