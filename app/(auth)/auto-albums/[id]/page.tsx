import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HeaderBack } from "@/app/components/layout/Headerback";

export default async function AutoAlbumDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.familyId) {
        redirect("/login");
    }

    const album = await prisma.autoAlbum.findFirst({
        where: {
            id,
            familyId: session.familyId,
        },
        include: {
            items: {
                include: {
                    post: true,
                },
            },
        },
    });

    if (!album) {
        redirect("/album");
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <HeaderBack title={album.title} href="/album" />

            <section className="grid grid-cols-3 gap-1 p-1">
                {album.items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/timeline/${item.post.id}`}
                        className="relative aspect-square overflow-hidden"
                    >
                        {item.post.mediaType === "video" ? (
                            <>
                                <video
                                    src={item.post.imageUrl}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-2xl text-white">
                                    ▶
                                </div>
                            </>
                        ) : (
                            <img
                                src={item.post.imageUrl}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        )}
                    </Link>
                ))}
            </section>
        </main>
    );
}