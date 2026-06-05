import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("REGISTER BODY:", body);

        const {
            mode,
            userName,
            familyName,
            inviteCode,
            email,
            password,
        } = body;

        if (!userName || !email || !password) {
            return NextResponse.json(
                { error: "入力項目が不足しています" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "このメールアドレスは既に登録されています" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // =========================
        // 家族を新規作成
        // =========================
        if (mode === "create") {
            if (!familyName) {
                return NextResponse.json(
                    { error: "家族名を入力してください" },
                    { status: 400 }
                );
            }

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,

                    profile: {
                        create: {
                            userName,
                        },
                    },

                    memberships: {
                        create: {
                            role: "admin",

                            family: {
                                create: {
                                    name: familyName,
                                },
                            },
                        },
                    },
                },
                include: {
                    memberships: true,
                },
            });

            await prisma.invitation.create({
                data: {
                    code: crypto.randomUUID().slice(0, 8),
                    familyId: user.memberships[0].familyId,
                },
            });

            return NextResponse.json({
                ok: true,
                userId: user.id,
            });
        }

        // =========================
        // 招待コードで参加
        // =========================
        if (mode === "join") {
            if (!inviteCode) {
                return NextResponse.json(
                    { error: "招待コードを入力してください" },
                    { status: 400 }
                );
            }

            const invitation = await prisma.invitation.findUnique({
                where: {
                    code: inviteCode,
                },
            });

            if (!invitation) {
                return NextResponse.json(
                    { error: "招待コードが無効です" },
                    { status: 400 }
                );
            }

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,

                    profile: {
                        create: {
                            userName,
                        },
                    },

                    memberships: {
                        create: {
                            role: "viewer",
                            familyId: invitation.familyId,
                        },
                    },
                },
            });

            return NextResponse.json({
                ok: true,
                userId: user.id,
            });
        }

        return NextResponse.json(
            { error: "登録方法が不正です" },
            { status: 400 }
        );
    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "新規登録に失敗しました",
            },
            { status: 500 }
        );
    }
}
