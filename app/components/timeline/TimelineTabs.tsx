"use client";

import { useState } from "react";
import Link from "next/link";
import { AppHeader } from "../layout/AppHeader";

export function TimelineTabs({ posts }) {
    const grouped = posts.reduce((acc, post) => {
        const d = new Date(post.createdAt);
        const key = `${d.getFullYear()}年${d.getMonth() + 1}月`;

        if (!acc[key]) acc[key] = [];
        acc[key].push(post);

        return acc;
    }, {});

    const months = Object.keys(grouped);
    const [selectedMonth, setSelectedMonth] = useState(months[0]);

    if (posts.length === 0) {
        return (
            <main className="min-h-screen bg-gray-50 pb-24">
                <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
                    <div className="mb-4 text-5xl">📷</div>
                    <h2 className="text-lg font-semibold">まだ投稿がありません</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        家族の写真を投稿して、思い出を残しましょう
                    </p>

                    <Link
                        href="/upload"
                        className="mt-6 rounded-full bg-blue-500 px-6 py-2 text-sm text-white shadow"
                    >
                        写真を投稿する
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <AppHeader title="タイムライン" />

            {/* 月タブ */}
            <div className="sticky top-[61px] z-10 bg-gray-50/95 py-3 backdrop-blur">
                <div className="overflow-x-auto px-3">
                    <div className="flex min-w-max gap-2 rounded-2xl bg-white p-1 shadow-sm">
                        {months.map((month) => (
                            <button
                                key={month}
                                onClick={() => setSelectedMonth(month)}
                                className={`shrink-0 rounded-2xl px-5 py-2 text-sm font-medium transition ${selectedMonth === month
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

            {/* 月見出し */}
            <section className="px-3 pt-3">
                <h2 className="mx-auto max-w-screen-sm text-xl font-bold">
                    {selectedMonth}
                </h2>
            </section>

            {/* 投稿一覧 */}
            <section className="mx-auto mt-3 max-w-screen-sm space-y-3 px-3">
                {grouped[selectedMonth]?.map((post) => (
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
                                        preload="metadata"
                                        className="aspect-[4/3] w-full object-cover"
                                    />

                                    {/* 再生アイコン */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="rounded-full bg-black/40 px-4 py-2 text-3xl text-white">
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

                        <div className="flex items-center justify-between px-4 py-3">
                            <div>
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

                            <Link
                                href={`/timeline/${post.id}`}
                                className="flex items-center gap-1 rounded-full px-3 py-1 text-sm text-gray-600"
                            >
                                💬
                                <span>{post.comments?.length ?? 0}</span>
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}

