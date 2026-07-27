import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../src/lib/supabase-admin";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "ファイルがありません" },
                { status: 400 },
            );
        }

        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (!isImage && !isVideo) {
            return NextResponse.json(
                { error: "画像または動画を選択してください" },
                { status: 400 },
            );
        }

        const mediaType = isVideo ? "video" : "image";

        const ext = file.name.split(".").pop() ?? (isVideo ? "mp4" : "jpg");

        const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

        console.log("UPLOAD FILE:", fileName);
        console.log("MEDIA TYPE:", mediaType);

        const { error } = await supabaseAdmin.storage
            .from("photos")
            .upload(fileName, file, {
                contentType: file.type,
            });

        if (error) {
            console.error("SUPABASE STORAGE ERROR:", error);

            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const { data } = supabaseAdmin.storage
            .from("photos")
            .getPublicUrl(fileName);

        return NextResponse.json({
            imageUrl: data.publicUrl,
            mediaType,
        });
    } catch (error) {
        console.error("UPLOAD ERROR:", error);

        return NextResponse.json(
            { error: "アップロード失敗" },
            { status: 500 },
        );
    }
}
