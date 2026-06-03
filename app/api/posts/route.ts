import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { imageUrl, title } = await req.json();

        const userId = session.user?.id;

        if (!userId) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 401 }
            );
        }

        const familyId = session.familyId;

        const post = await prisma.post.create({
            data: {
                imageUrl,
                title,
                userId,
                familyId,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("POST ERROR:", error);

        return NextResponse.json(
            {
                error: String(error),
            },
            { status: 500 }
        );
    }
}