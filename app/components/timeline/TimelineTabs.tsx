"use client";

import { useState } from "react";
import Link from "next/link";

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

    return (
        <main className="min-h-screen bg-gray-100 pb-16">

            {/* ✅ タブ */}
            <div className="mx-auto mt-2 max-w-md overflow-x-auto px-4">
                <div className="flex gap-2">
                    {months.map((month) => (
                        <button
                            key={month}
                            onClick={() => setSelectedMonth(month)}
                            className={`rounded-full px-3 py-1 text-sm ${selectedMonth === month
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-600 shadow"
                                }`}
                        >
                            {month}
                        </button>
                    ))}
                </div>
            </div>

            {/* ✅ 投稿表示 */}
            <section className="mx-auto mt-4 max-w-md space-y-4 px-4">
                {grouped[selectedMonth]?.map((post) => (
                    <article
                        key={post.id}
                        className="overflow-hidden rounded-xl bg-white shadow"
                    >
                        <Link href={`/timeline/${post.id}`}>
                            {post.imageUrl}
                        </Link>

                        <div className="px-3 py-2">
                            <p className="text-sm font-medium">
                                {post.user?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                            </p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}