"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CommentForm({ postId }: { postId: string }) {
    const router = useRouter();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const submitComment = async () => {
        if (!content.trim()) return;

        setLoading(true);

        const res = await fetch(`/api/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });

        setLoading(false);

        if (!res.ok) {
            const data = await res.json();
            alert(data.error ?? "コメント投稿に失敗しました");
            return;
        }

        setContent("");
        router.refresh();
    };

    return (
        <div className="fixed bottom-16 left-0 right-0 z-30 border-t bg-white">
            <div className="mx-auto flex max-w-screen-sm gap-2 px-3 py-3">
                <input
                    type="text"
                    placeholder="コメントを書く..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 rounded-full border px-4 py-2 text-sm"
                />

                <button
                    onClick={submitComment}
                    disabled={loading || !content.trim()}
                    className="rounded-full bg-blue-500 px-4 py-2 text-sm text-white disabled:opacity-50"
                >
                    送信
                </button>
            </div>
        </div>
    );
}