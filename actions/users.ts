"use server";

import prisma from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { use } from "react";

// export async function getDbUserByKindeId() {
//     const { isAuthenticated, getUser } = getKindeServerSession()

//     if (!isAuthenticated) return null;

//     const kindeUser = await getUser();

//     if (!kindeUser) return null;

//     const user = prisma.user.findUnique({
//         where: { kindeId: kindeUser.id}
//     });

//     return user;
// }

export async function getKindeUser() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return user;
}