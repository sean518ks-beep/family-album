import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AppHeader } from "@/app/components/layout/AppHeader";

export default async function AlbumPage() {
    const session = await getServerSession(authOptions);

    if (!session?.familyId) {
        redirect("/login");
    }

    const posts = await prisma.post.findMany({
        where: {
            familyId: session.familyId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const grouped = posts.reduce((acc, post) => {
        const d = new Date(post.createdAt);

        const key = `${d.getFullYear()}-${String(
            d.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!acc[key]) acc[key] = [];
        acc[key].push(post);

        return acc;
    }, {} as Record<string, typeof posts>);

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <AppHeader title="アルバム" />

            {/* タブ */}
            <div className="mx-auto max-w-screen-sm px-3 pt-3">
                <div className="grid grid-cols-2 rounded-2xl bg-white p-1 shadow-sm">
                    <Link
                        href="/album"
                        className="rounded-xl bg-blue-500 py-2 text-center text-sm font-medium text-white"
                    >
                        月別アルバム
                    </Link>

                    <Link
                        href="/auto-albums"
                        className="rounded-xl py-2 text-center text-sm font-medium text-gray-600"
                    >
                        自動アルバム
                    </Link>
                </div>
            </div>

            <section className="mx-auto mt-4 max-w-screen-sm space-y-4 p-3">
                {Object.entries(grouped).map(([month, items]) => {
                    const cover = items[0];

                    return (
                        <Link
                            key={month}
                            href={`/album/${month}`}
                            className="block overflow-hidden rounded-2xl bg-white shadow-sm"
                        >
                            {cover.mediaType === "video" ? (
                                <div className="relative">
                                    <video
                                        src={cover.imageUrl}
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="h-52 w-full object-cover"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="rounded-full bg-black/50 px-4 py-2 text-white">
                                            ▶
                                        </div>
                                    </div>

                                    <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                                        動画
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={cover.imageUrl}
                                    alt=""
                                    className="h-52 w-full object-cover"
                                />
                            )}

                            <div className="p-4">
                                <h2 className="text-lg font-semibold">
                                    {month.replace("-", "年")}月
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {items.length}件
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </section>
        </main>
    );
}