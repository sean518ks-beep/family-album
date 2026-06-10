import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.familyId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { keyword } = await req.json();

        if (!keyword || typeof keyword !== "string") {
            return NextResponse.json(
                { error: "キーワードを入力してください" },
                { status: 400 }
            );
        }

        const keywordMap: Record<string, string[]> = {
            ごはん: ["ごはん", "ご飯", "食事", "ランチ", "夕食", "朝ごはん", "晩ごはん", "おやつ"],
            運動会: ["運動会", "かけっこ", "リレー", "玉入れ"],
            遊園地: ["遊園地", "テーマパーク", "観覧車", "メリーゴーランド"],
            誕生日: ["誕生日", "バースデー", "birthday"],
            公園: ["公園", "すべり台", "ブランコ", "砂場"],
        };

        const keywords = keywordMap[keyword] ?? [keyword];

        const posts = await prisma.post.findMany({
            where: {
                familyId: session.familyId,
                OR: [
                    ...keywords.map((word) => ({
                        title: {
                            contains: word,
                            mode: "insensitive" as const,
                        },
                    })),
                    ...keywords.map((word) => ({
                        comments: {
                            some: {
                                content: {
                                    contains: word,
                                    mode: "insensitive" as const,
                                },
                            },
                        },
                    })),
                ],
            },
        });

        if (posts.length === 0) {
            return NextResponse.json(
                { error: "対象の投稿が見つかりませんでした" },
                { status: 404 }
            );
        }

        const album = await prisma.autoAlbum.create({
            data: {
                familyId: session.familyId,
                title: `${keyword}の思い出`,
                keyword,
                items: {
                    create: posts.map((post) => ({
                        postId: post.id,
                    })),
                },
            },
        });

        return NextResponse.json({
            ok: true,
            albumId: album.id,
        });
    } catch (error) {
        console.error("AUTO ALBUM ERROR:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "自動アルバム作成に失敗しました",
            },
            { status: 500 }
        );
    }
}