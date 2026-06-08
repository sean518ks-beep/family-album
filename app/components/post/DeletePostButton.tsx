"use client";

import { useRouter } from "next/navigation";

export function DeletePostButton({
    postId,
}: {
    postId: string;
}) {
    const router = useRouter();

    const deletePost = async () => {
        const ok = confirm("この投稿を削除しますか？");

        if (!ok) return;

        const res = await fetch(`/api/posts/${postId}/delete`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error ?? "削除に失敗しました");
            return;
        }

        router.push("/timeline");
        router.refresh();
    };

    return (
        <button
            onClick={deletePost}
            className="rounded-full bg-red-500 px-4 py-2 text-sm text-white"
        >
            投稿を削除
        </button>
    );
}