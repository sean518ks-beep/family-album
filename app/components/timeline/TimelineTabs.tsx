"use client";

import { useState } from "react";
import Link from "next/link";

import { AppHeader } from "../layout/AppHeader";
import { LikeButton } from "../post/LikeButton";

type TimelinePost = {
    id: string;
    imageUrl: string;
    mediaType: string;
    title: string | null;
    createdAt: Date | string;

    currentUserId?: string;

    user?: {
        profile?: {
            userName: string;
        } | null;
    } | null;

    comments?: {
        id: string;
        content: string;
    }[];

    likes?: {
        id: string;
        userId: string;
    }[];
};

type TimelineTabsProps = {
    posts: TimelinePost[];
    canPost: boolean;
};

export function TimelineTabs({
    posts,
    canPost,
}: TimelineTabsProps) {
    const grouped = posts.reduce<Record<string, TimelinePost[]>>(
        (acc, post) => {
            const date = new Date(post.createdAt);

            const key =
                `${date.getFullYear()}年` +
                `${date.getMonth() + 1}月`;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(post);

            return acc;
        },
        {}
    );

    const months = Object.keys(grouped);

    const [selectedMonth, setSelectedMonth] = useState(
        months[0] ?? ""
    );

    if (posts.length === 0) {
        return (
            <main className="min-h-screen bg-gray-50 pb-24">
                <AppHeader title="タイムライン" />

                <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                    <div className="mb-4 text-5xl">📷</div>

                    <h2 className="text-lg font-semibold">
                        まだ投稿がありません
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        家族の写真や動画を投稿して、
                        思い出を残しましょう
                    </p>

                    {canPost && (
                        <Link
                            href="/upload"
                            className="mt-6 rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white shadow"
                        >
                            写真・動画を投稿する
                        </Link>
                    )}

                    {!canPost && (
                        <p className="mt-4 text-xs text-gray-400">
                            閲覧者は投稿できません
                        </p>
                    )}
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <AppHeader title="タイムライン" />

            {/* 月タブ */}
            <div className="sticky top-14 z-10 bg-gray-50/95 py-3 backdrop-blur">
                <div className="overflow-x-auto px-3">
                    <div className="flex min-w-max gap-2 rounded-2xl bg-white p-1 shadow-sm">
                        {months.map((month) => (
                            <button
                                key={month}
                                type="button"
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
                                        playsInline
                                        preload="metadata"
                                        className="aspect-[4/3] w-full object-cover"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 pl-1 text-2xl text-white">
                                            ▶
                                        </span>
                                    </div>

                                    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                                        動画
                                    </span>
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
                                            (like) =>
                                                like.userId === post.currentUserId
                                        ) ?? false
                                    }
                                />

                                <Link
                                    href={`/timeline/${post.id}`}
                                    className="flex items-center gap-1 text-sm text-gray-600"
                                >
                                    <span>💬</span>
                                    <span>{post.comments?.length ?? 0}</span>
                                </Link>
                            </div>

                            {/* 投稿情報 */}
                            <div className="mt-3">
                                <p className="text-sm font-semibold text-gray-800">
                                    {post.user?.profile?.userName ??
                                        "名前未設定"}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString("ja-JP")}
                                </p>

                                {post.title && (
                                    <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">
                                        {post.title}
                                    </p>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            {/* 編集者・管理者だけ表示 */}
            {canPost && (
                <Link
                    href="/upload"
                    aria-label="写真・動画を投稿"
                    className="fixed bottom-24 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-3xl text-white shadow-lg"
                >
                    ＋
                </Link>
            )}
        </main>
    );
}