import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HeaderBack } from "../../../components/layout/Headerback";


export default async function AlbumMonthPage({
    params,
}: {
    params: Promise<{ month: string }>;
}) {
    const { month } = await params;

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

    const monthPosts = posts.filter((post) => {
        const d = new Date(post.createdAt);

        const key = `${d.getFullYear()}-${String(
            d.getMonth() + 1
        ).padStart(2, "0")}`;

        return key === month;
    });

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <HeaderBack
                title={`${month.replace("-", "年")}月`}
                href="/album"
            />

            <section className="grid grid-cols-3 gap-1 p-1">
                {monthPosts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/timeline/${post.id}`}
                        className="relative aspect-square overflow-hidden"
                    >
                        {post.mediaType === "video" ? (
                            <>
                                <video
                                    src={post.imageUrl}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl text-white">
                                        ▶
                                    </span>
                                </div>
                            </>
                        ) : (
                            <img
                                src={post.imageUrl}
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