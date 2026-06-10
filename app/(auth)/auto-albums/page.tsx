import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AppHeader } from "@/app/components/layout/AppHeader";
import { CreateAutoAlbumForm } from "../../components/forms/CreateAutoAlbumForm";

export default async function AutoAlbumsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.familyId) {
        redirect("/login");
    }

    const albums = await prisma.autoAlbum.findMany({
        where: {
            familyId: session.familyId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            items: {
                include: {
                    post: true,
                },
            },
        },
    });

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <AppHeader title="アルバム" />

            {/* タブ */}
            <div className="mx-auto max-w-screen-sm px-3 pt-3">
                <div className="grid grid-cols-2 rounded-2xl bg-white p-1 shadow-sm">
                    <Link
                        href="/album"
                        className="rounded-xl py-2 text-center text-sm font-medium text-gray-600"
                    >
                        月別アルバム
                    </Link>

                    <Link
                        href="/auto-albums"
                        className="rounded-xl bg-blue-500 py-2 text-center text-sm font-medium text-white"
                    >
                        自動アルバム
                    </Link>
                </div>
            </div>

            {/* 自動アルバム作成 */}
            <div className="mx-auto max-w-screen-sm px-3 pt-4">
                <CreateAutoAlbumForm />
            </div>

            <section className="mx-auto mt-4 max-w-screen-sm space-y-4 p-3">
                {albums.length === 0 && (
                    <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                        <div className="mb-3 text-4xl">✨</div>

                        <p className="font-semibold">
                            まだ自動アルバムがありません
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            キーワードから思い出を自動で集めましょう
                        </p>

                        <Link
                            href="/album"
                            className="mt-4 inline-block rounded-full bg-blue-500 px-5 py-2 text-sm text-white"
                        >
                            アルバムへ戻る
                        </Link>
                    </div>
                )}

                {albums.map((album) => {
                    const cover = album.items[0]?.post;

                    return (
                        <Link
                            key={album.id}
                            href={`/auto-albums/${album.id}`}
                            className="block overflow-hidden rounded-2xl bg-white shadow-sm"
                        >
                            {cover ? (
                                cover.mediaType === "video" ? (
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
                                )
                            ) : (
                                <div className="flex h-52 items-center justify-center bg-gray-100 text-gray-400">
                                    画像なし
                                </div>
                            )}

                            <div className="p-4">
                                <h2 className="text-lg font-semibold">
                                    {album.title}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {album.items.length}件
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    {new Date(album.createdAt).toLocaleDateString("ja-JP")}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </section>
        </main>
    );
}