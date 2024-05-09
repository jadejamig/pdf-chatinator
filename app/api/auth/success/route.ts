export const dynamic = "force-dynamic";

import { getKindeUser } from "@/actions/users";
import prisma from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = await getKindeUser();

    if (!user || user == null || !user.id)
        throw new Error("something went wrong with authentication" + user);

    let dbUser = await prisma.user.findUnique({
        where: {kindeId: user.id}
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                kindeId: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "" // Using nullish coalescing operator to provide a default empty string value
            }
        });
    }

    // Given an incoming request...
    const dashboardUrl = new URL('/dashboard', req.url)
    // Add ?from=/incoming-url to the /login URL
    // dashboardUrl.searchParams.set('from', req.nextUrl.pathname)
    // And redirect to the new URL
    return NextResponse.redirect(dashboardUrl);
}