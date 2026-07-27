import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";
import { supabaseAdmin } from "@/src/lib/supabase-admin";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || !session.familyId) {
            return NextResponse.json(
                { error: "ログインが必要です" },
                { status: 401 },
            );
        }

        const member = await prisma.familyMember.findFirst({
            where: {
                userId: session.user.id,
                familyId: session.familyId,
            },
            select: {
                role: true,
            },
        });

        if (!member) {
            return NextResponse.json(
                { error: "家族メンバーが見つかりません" },
                { status: 403 },
            );
        }

        if (member.role === "viewer") {
            return NextResponse.json(
                { error: "閲覧者は写真や動画を投稿できません" },
                { status: 403 },
            );
        }

        const formData = await req.formData();
        const fileValue = formData.get("file");

        if (!(fileValue instanceof File)) {
            return NextResponse.json(
                { error: "ファイルを選択してください" },
                { status: 400 },
            );
        }

        const file = fileValue;

        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (!isImage && !isVideo) {
            return NextResponse.json(
                { error: "画像または動画のみアップロードできます" },
                { status: 400 },
            );
        }

        const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

        if (file.size > maxSize) {
            return NextResponse.json(
                {
                    error: isVideo
                        ? "動画は100MB以内にしてください"
                        : "画像は10MB以内にしてください",
                },
                { status: 400 },
            );
        }

        const mediaType = isVideo ? "video" : "image";

        const originalExtension =
            file.name.split(".").pop()?.toLowerCase() ??
            (isVideo ? "mp4" : "jpg");

        const safeExtension = originalExtension.replace(/[^a-z0-9]/g, "");

        if (!safeExtension) {
            return NextResponse.json(
                { error: "ファイルの拡張子が不正です" },
                { status: 400 },
            );
        }

        const filePath = [
            session.familyId,
            session.user.id,
            `${Date.now()}-${crypto.randomUUID()}.${safeExtension}`,
        ].join("/");

        const { error: uploadError } = await supabaseAdmin.storage
            .from("photos")
            .upload(filePath, file, {
                contentType: file.type,
                upsert: false,
            });

        if (uploadError) {
            console.error("SUPABASE STORAGE ERROR:", uploadError);

            return NextResponse.json(
                { error: uploadError.message },
                { status: 500 },
            );
        }

        const { data: publicUrlData } = supabaseAdmin.storage
            .from("photos")
            .getPublicUrl(filePath);

        return NextResponse.json(
            {
                imageUrl: publicUrlData.publicUrl,
                mediaType,
                storagePath: filePath,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("UPLOAD ERROR:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "アップロードに失敗しました",
            },
            { status: 500 },
        );
    }
}
