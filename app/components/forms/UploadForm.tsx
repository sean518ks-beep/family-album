"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // ✅ フォームのデフォルト動作止める

        if (!file) return;

        // ✅ 今は仮の画像URL（あとでS3などに変更）
        const imageUrl = "https://placehold.co/600x600";

        await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                imageUrl,
                title: text,
            }),
        });

        // ✅ 投稿後一覧へ
        router.push("/timeline");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* 写真選択 */}
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-500 hover:bg-gray-50">
                <span className="text-sm">
                    {file ? file.name : "＋ 写真を選択"}
                </span>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
            </label>

            {/* コメント */}
            <textarea
                placeholder="コメント（任意）"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
            />

            {/* 投稿ボタン */}
            <button
                type="submit"
                disabled={!file}
                className="w-full rounded-md bg-blue-500 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
                投稿する
            </button>
        </form>
    );
}
``