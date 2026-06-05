"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            // ① Supabase Storageへアップロード
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(uploadData.error);
            }

            // ② DBへ保存
            const postRes = await fetch("/api/posts", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageUrl: uploadData.imageUrl,
                    title: text,
                }),
            });

            if (!postRes.ok) {
                throw new Error("投稿に失敗しました");
            }

            router.push("/timeline");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("投稿に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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

            {file && (
                <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full rounded-lg border"
                />
            )}

            <textarea
                placeholder="コメント（任意）"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
            />

            <button
                type="submit"
                disabled={!file || loading}
                className="w-full rounded-md bg-blue-500 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
                {loading ? "投稿中..." : "投稿する"}
            </button>
        </form>
    );
}