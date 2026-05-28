
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageUrl, title } = await req.json();

    if (!imageUrl) {
        return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }

    const userId = session.user?.id;
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ 仮で固定（あとでfamilyId連動）
    const familyId = "test-family";

    // ✅ 投稿作成
    await prisma.post.create({
        data: {
            imageUrl,
            title,
            userId,
            familyId,
        },
    });

    return NextResponse.json({ ok: true });
}