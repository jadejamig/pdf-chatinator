import { getFileFromDb } from "@/actions/files";
import { getKindeUser } from "@/actions/users";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const user = await getKindeUser();

    if (!user?.id)
        return new NextResponse("Unauthorized", { status: 401 })

    const userId = user.id;

    const body = await req.json()

    const { fileId, message} = SendMessageValidator.parse(body);

    const existingFile = await getFileFromDb(fileId)

    if (!existingFile)
        return new NextResponse("File not found!", { status: 404 });

    await prisma.message.create({
        data: {
            text: message,
            isUserMessage: true,
            userId: userId,
            fileId: fileId
        },
    })

}