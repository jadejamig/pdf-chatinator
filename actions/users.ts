"use server";

import prisma from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUserByKindeId() {
    const { isAuthenticated, getUser } = getKindeServerSession()

    if (!isAuthenticated) return null;

    const kindeUser = await getUser();

    if (!kindeUser) return null;

    const user = prisma.user.findUnique({
        where: { kindeId: kindeUser.id}
    });

    return user;
}