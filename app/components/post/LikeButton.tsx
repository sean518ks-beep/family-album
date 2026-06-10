"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LikeButton({
    postId,
    initialLiked,
    initialCount,
}: {
    postId: string;
    initialLiked: boolean;
    initialCount: number;
}) {
    const router = useRouter();

    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);
    const [loading, setLoading] = useState(false);

    const toggleLike = async () => {
        if (loading) return;

        setLoading(true);

        const res = await fetch(`/api/posts/${postId}/likes`, {
            method: "POST",
        });

        const data = await res.json();

        setLoading(false);

        if (!res.ok) {
            alert(data.error ?? "いいねに失敗しました");
            return;
        }

        setLiked(data.liked);
        setCount((prev) => (data.liked ? prev + 1 : prev - 1));

        router.refresh();
    };

    return (
        <button
            onClick={toggleLike}
            disabled={loading}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm ${liked
                    ? "bg-pink-100 text-pink-500"
                    : "bg-gray-100 text-gray-600"
                }`}
        >
            <span>{liked ? "❤️" : "🤍"}</span>
            <span>{count}</span>
        </button>
    );
}