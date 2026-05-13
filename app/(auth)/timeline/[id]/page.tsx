// src/app/timeline/[id]/page.tsx

import Link from "next/link";

// ✅ ダミーデータ
const dummyPost = {
    id: "1",
    imageUrl: "https://placehold.co/600x600",
    user: { name: "ママ" },
    createdAt: new Date(),
    comments: [
        { id: "c1", user: { name: "パパ" }, content: "かわいい！" },
        { id: "c2", user: { name: "祖母" }, content: "元気そうで安心！" },
    ],
};

export default function PostDetailPage() {
    const post = dummyPost;

    return (
        <main className="min-h-screen bg-gray-100 pb-20">

            {/* 投稿 */}
            <div className="mx-auto max-w-md">
                <div className="bg-white shadow">
                    {/* 画像 */}
                    {post.imageUrl}

                    {/* 投稿者情報 */}
                    <div className="px-4 py-3">
                        <p className="text-sm font-medium">
                            {post.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {post.createdAt.toLocaleDateString("ja-JP")}
                        </p>
                    </div>
                </div>

                {/* コメント */}
                <div className="mt-4 space-y-2 px-4">
                    {post.comments.map((c) => (
                        <div
                            key={c.id}
                            className="rounded-lg bg-white px-3 py-2 shadow-sm"
                        >
                            <p className="text-sm font-medium">
                                {c.user.name}
                            </p>
                            <p className="text-sm text-gray-700">
                                {c.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* コメント入力 */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t">
                <div className="mx-auto flex max-w-md gap-2 px-3 py-3">
                    <input
                        type="text"
                        placeholder="コメントを書く..."
                        className="flex-1 rounded-md border px-3 py-2 text-sm"
                    />
                    <button className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white">
                        送信
                    </button>
                </div>
            </div>
        </main>
    );
}
