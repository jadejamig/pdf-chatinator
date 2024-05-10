export const dynamic = "force-dynamic";

import { getKindeUser } from "@/actions/users";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = await getKindeUser();

    if (!user || user == null || !user.id)
        throw new Error("something went wrong with authentication" + user);

    let dbUser = await prisma.user.findUnique({
        where: {id: user.id}
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "" // Using nullish coalescing operator to provide a default empty string value
            }
        });
    }

    const dashboardUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(dashboardUrl);
}