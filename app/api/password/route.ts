import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { currentPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    if (!user?.password) {
        return NextResponse.json(
            { error: "ユーザーが見つかりません" },
            { status: 404 }
        );
    }

    const isValid = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isValid) {
        return NextResponse.json(
            { error: "現在のパスワードが違います" },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
        },
    });

    return NextResponse.json({
        ok: true,
    });
}