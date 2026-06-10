"use client";

import { useState } from "react";
import Link from "next/link";
import { AppHeader } from "../layout/AppHeader";
import { LikeButton } from "../post/LikeButton";

export function TimelineTabs({ posts }) {
    const [keyword, setKeyword] = useState("");

    const filteredPosts = posts.filter((post) => {
        const q = keyword.toLowerCase();

        return (
            post.title?.toLowerCase().includes(q) ||
            post.user?.profile?.userName?.toLowerCase().includes(q) ||
            post.comments?.some((comment) =>
                comment.content.toLowerCase().includes(q)
            )
        );
    });

    const grouped = filteredPosts.reduce((acc, post) => {
        const d = new Date(post.createdAt);
        const key = `${d.getFullYear()}年${d.getMonth() + 1}月`;

        if (!acc[key]) acc[key] = [];
        acc[key].push(post);

        return acc;
    }, {});

    const months = Object.keys(grouped);
    const [selectedMonth, setSelectedMonth] = useState(months[0]);

    const visibleMonth = months.includes(selectedMonth)
        ? selectedMonth
        : months[0];

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <AppHeader title="タイムライン" />

            {/* 検索 */}
            <section className="mx-auto max-w-screen-sm px-3 py-3">
                <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="写真・コメント・投稿者を検索"
                    className="w-full rounded-full border bg-white px-4 py-2 text-sm shadow-sm"
                />
            </section>

            {filteredPosts.length === 0 ? (
                <section className="px-4 py-20 text-center text-sm text-gray-500">
                    投稿が見つかりません
                </section>
            ) : (
                <>
                    {/* 月タブ */}
                    <div className="bg-gray-50/95 py-2">
                        <div className="overflow-x-auto px-3">
                            <div className="flex min-w-max gap-2 rounded-2xl bg-white p-1 shadow-sm">
                                {months.map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => setSelectedMonth(month)}
                                        className={`shrink-0 rounded-2xl px-5 py-2 text-sm font-medium ${visibleMonth === month
                                            ? "bg-blue-500 text-white shadow"
                                            : "text-gray-600"
                                            }`}
                                    >
                                        {month}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <section className="px-3 pt-3">
                        <h2 className="mx-auto max-w-screen-sm text-xl font-bold">
                            {visibleMonth}
                        </h2>
                    </section>

                    {/* 投稿一覧 */}
                    <section className="mx-auto mt-3 max-w-screen-sm space-y-3 px-3">
                        {grouped[visibleMonth]?.map((post) => (
                            <article
                                key={post.id}
                                className="overflow-hidden rounded-xl bg-white shadow-sm"
                            >
                                <Link href={`/timeline/${post.id}`}>
                                    {post.mediaType === "video" ? (
                                        <div className="relative">
                                            <video
                                                src={post.imageUrl}
                                                muted
                                                playsInline
                                                preload="metadata"
                                                className="aspect-[4/3] w-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="rounded-full bg-black/50 px-4 py-2 text-white">
                                                    ▶
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title ?? "投稿画像"}
                                            className="aspect-[4/3] w-full object-cover"
                                        />
                                    )}
                                </Link>

                                <div className="px-4 py-3">
                                    {/* いいね・コメント */}
                                    <div className="flex items-center gap-4">
                                        <LikeButton
                                            postId={post.id}
                                            initialCount={post.likes?.length ?? 0}
                                            initialLiked={
                                                post.likes?.some(
                                                    (like) => like.userId === post.currentUserId
                                                ) ?? false
                                            }
                                        />

                                        <Link
                                            href={`/timeline/${post.id}`}
                                            className="flex items-center gap-1 text-sm text-gray-600"
                                        >
                                            💬
                                            <span>{post.comments?.length ?? 0}</span>
                                        </Link>
                                    </div>

                                    {/* 投稿者 */}
                                    <div className="mt-3">
                                        <p className="text-sm font-semibold text-gray-800">
                                            {post.user?.profile?.userName ?? "名前未設定"}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                                        </p>

                                        {post.title && (
                                            <p className="mt-1 text-sm text-gray-700">
                                                {post.title}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                </>
            )}
        </main>
    );
}

