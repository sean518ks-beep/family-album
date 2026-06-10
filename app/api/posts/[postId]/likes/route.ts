import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ postId: string }> }
) {
    const { postId } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.familyId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await prisma.post.findFirst({
        where: {
            id: postId,
            familyId: session.familyId,
        },
    });

    if (!post) {
        return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });
    }

    const existingLike = await prisma.like.findUnique({
        where: {
            postId_userId: {
                postId,
                userId: session.user.id,
            },
        },
    });

    if (existingLike) {
        await prisma.like.delete({
            where: {
                id: existingLike.id,
            },
        });

        return NextResponse.json({
            liked: false,
        });
    }

    await prisma.like.create({
        data: {
            postId,
            userId: session.user.id,
        },
    });

    return NextResponse.json({
        liked: true,
    });
}