import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

async function checkAdmin(userId: string, familyId: string) {
    const member = await prisma.familyMember.findFirst({
        where: {
            userId,
            familyId,
            role: "admin",
        },
    });

    return !!member;
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ memberId: string }> }
) {
    const { memberId } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.familyId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = await checkAdmin(session.user.id, session.familyId);

    if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { role } = await req.json();

    if (!["admin", "editor", "viewer"].includes(role)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const target = await prisma.familyMember.findUnique({
        where: { id: memberId },
    });

    if (!target || target.familyId !== session.familyId) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (target.userId === session.user.id) {
        return NextResponse.json(
            { error: "自分自身の役割は変更できません" },
            { status: 400 }
        );
    }

    await prisma.familyMember.update({
        where: { id: memberId },
        data: { role },
    });

    return NextResponse.json({ ok: true });
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ memberId: string }> }
) {
    const { memberId } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.familyId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = await checkAdmin(session.user.id, session.familyId);

    if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const target = await prisma.familyMember.findUnique({
        where: { id: memberId },
    });

    if (!target || target.familyId !== session.familyId) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (target.userId === session.user.id) {
        return NextResponse.json(
            { error: "自分自身は削除できません" },
            { status: 400 }
        );
    }

    await prisma.familyMember.delete({
        where: { id: memberId },
    });

    return NextResponse.json({ ok: true });
}