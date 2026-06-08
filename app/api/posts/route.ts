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

        const { imageUrl, title, mediaType } = await req.json();

        if (!imageUrl) {
            return NextResponse.json(
                { error: "imageUrl is required" },
                { status: 400 }
            );
        }

        const userId = session.user?.id;
        const familyId = session.familyId;

        if (!userId) {
            return NextResponse.json(
                { error: "userId is missing" },
                { status: 401 }
            );
        }

        if (!familyId) {
            return NextResponse.json(
                { error: "familyId is missing" },
                { status: 400 }
            );
        }

        const post = await prisma.post.create({
            data: {
                imageUrl,
                title,
                mediaType: mediaType ?? "image",

                user: {
                    connect: {
                        id: userId,
                    },
                },

                family: {
                    connect: {
                        id: familyId,
                    },
                },
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("POST CREATE ERROR:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "投稿に失敗しました",
            },
            { status: 500 }
        );
    }
}