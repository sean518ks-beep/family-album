import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

const allowedMediaTypes = ["image", "video"];

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || !session.familyId) {
            return NextResponse.json(
                { error: "ログインが必要です" },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const familyId = session.familyId;

        // ログインユーザーの家族内での役割を確認
        const member = await prisma.familyMember.findFirst({
            where: {
                userId,
                familyId,
            },
        });

        if (!member) {
            return NextResponse.json(
                { error: "家族メンバーが見つかりません" },
                { status: 403 }
            );
        }

        // 閲覧者は投稿できない
        if (member.role === "viewer") {
            return NextResponse.json(
                { error: "閲覧者は写真や動画を投稿できません" },
                { status: 403 }
            );
        }

        const body = await req.json();

        const imageUrl =
            typeof body.imageUrl === "string"
                ? body.imageUrl.trim()
                : "";

        const title =
            typeof body.title === "string"
                ? body.title.trim()
                : "";

        const mediaType =
            typeof body.mediaType === "string"
                ? body.mediaType
                : "image";

        if (!imageUrl) {
            return NextResponse.json(
                { error: "画像または動画のURLがありません" },
                { status: 400 }
            );
        }

        if (!allowedMediaTypes.includes(mediaType)) {
            return NextResponse.json(
                { error: "メディアの種類が不正です" },
                { status: 400 }
            );
        }

        if (title.length > 50) {
            return NextResponse.json(
                { error: "コメントは50文字以内で入力してください" },
                { status: 400 }
            );
        }

        const post = await prisma.post.create({
            data: {
                imageUrl,
                mediaType,
                title: title || null,

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

        return NextResponse.json(post, { status: 201 });
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