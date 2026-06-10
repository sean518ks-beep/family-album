"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateAutoAlbumForm() {
    const router = useRouter();

    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const createAlbum = async () => {
        if (!keyword.trim()) return;

        try {
            setLoading(true);

            const res = await fetch("/api/auto-albums", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    keyword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error ?? "作成に失敗しました");
                return;
            }

            router.push(`/auto-albums/${data.albumId}`);
            router.refresh();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="mb-3 font-semibold">
                ✨ 自動アルバムを作成
            </h2>

            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="例：運動会、ごはん、遊園地"
                className="w-full rounded-xl border p-3"
            />

            <button
                onClick={createAlbum}
                disabled={loading || !keyword.trim()}
                className="mt-3 w-full rounded-xl bg-blue-500 py-3 text-white disabled:opacity-50"
            >
                {loading ? "作成中..." : "アルバムを作成"}
            </button>
        </div>
    );
}