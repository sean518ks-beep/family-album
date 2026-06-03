import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../src/lib/supabase-admine";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "ファイルがありません" },
                { status: 400 }
            );
        }

        const ext = file.name.split(".").pop() ?? "jpg";

        const fileName =
            `${Date.now()}-${crypto.randomUUID()}.${ext}`;

        console.log("UPLOAD FILE:", fileName);

        const { data: uploadData, error } = await supabaseAdmin.storage
            .from("photos")
            .upload(fileName, file);

        if (error) {
            console.error("SUPABASE STORAGE ERROR:", error);

            return NextResponse.json(
                {
                    error: error.message,
                    details: error,
                },
                { status: 500 }
            );
        }

        console.log("UPLOAD SUCCESS:", uploadData);

        const { data: publicUrlData } = supabaseAdmin.storage
            .from("photos")
            .getPublicUrl(fileName);

        return NextResponse.json({
            imageUrl: publicUrlData.publicUrl,
        });
    } catch (error) {
        console.error("UPLOAD ROUTE ERROR:", error);

        return NextResponse.json(
            {
                error: "アップロード失敗",
            },
            { status: 500 }
        );
    }
}