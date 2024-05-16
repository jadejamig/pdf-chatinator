import prisma from "@/prisma/db";
import { count } from "console";
import { getKindeUser } from "./users";


export async function createPrompt() {
    const user = await getKindeUser();

    if (!user?.id)
        return null;

    const userId = user.id

    await prisma.prompt.deleteMany({
        where: { userId: userId }
    });

    await prisma.prompt.create({
        data: { userId: userId, count: 1 }
    });
}

export async function getPrompt() {
    const user = await getKindeUser();

    if (!user?.id)
        return null;

    const userId = user.id

    return await prisma.prompt.findFirst({
        where: { userId: userId }
    })
}

export async function isPromptExpired( ) {
    const user = await getKindeUser();

    if (!user?.id)
        return null;

    const prompt = await getPrompt();

    if (!prompt) return null

    return (Date.now() - prompt.createdAt.getTime()) >= ( 1000 * 60 * 60 * 24 ) // 1 Day
}

export async function updatePrompt() {
    const user = await getKindeUser();

    if (!user?.id)
        return null;

    const userId = user.id

    const prompt = await getPrompt();

    if (!prompt) return null

    await prisma.prompt.update({
        where: { id: prompt.id },
        data: { count: prompt.count + 1 }
    })
}