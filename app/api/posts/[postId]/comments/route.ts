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
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { content } = await req.json();

    if (!content || typeof content !== "string") {
        return NextResponse.json(
            { error: "コメントを入力してください" },
            { status: 400 }
        );
    }

    const post = await prisma.post.findFirst({
        where: {
            id: postId,
            familyId: session.familyId,
        },
    });

    if (!post) {
        return NextResponse.json(
            { error: "投稿が見つかりません" },
            { status: 404 }
        );
    }

    const comment = await prisma.comment.create({
        data: {
            content,
            postId,
            userId: session.user.id,
        },
    });

    return NextResponse.json(comment);
}