import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
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

    const member = await prisma.familyMember.findFirst({
        where: {
            userId: session.user.id,
            familyId: session.familyId,
        },
    });

    const isOwner = post.userId === session.user.id;
    const isAdmin = member?.role === "admin";

    if (!isOwner && !isAdmin) {
        return NextResponse.json(
            { error: "削除する権限がありません" },
            { status: 403 }
        );
    }

    await prisma.comment.deleteMany({
        where: {
            postId,
        },
    });

    await prisma.post.delete({
        where: {
            id: postId,
        },
    });

    return NextResponse.json({ ok: true });
}