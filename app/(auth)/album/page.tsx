import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AppHeader } from "../../components/layout/AppHeader";

export default async function AlbumPage() {
    const session = await getServerSession(authOptions);

    const posts = await prisma.post.findMany({
        where: {
            familyId: session?.familyId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const grouped = posts.reduce((acc, post) => {
        const d = new Date(post.createdAt);
        const key = `${d.getFullYear()}-${d.getMonth() + 1}`;

        if (!acc[key]) acc[key] = [];

        acc[key].push(post);

        return acc;
    }, {} as Record<string, typeof posts>);

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <AppHeader title="アルバム" />
            <div className="space-y-4 p-4">
                {Object.entries(grouped).map(([month, items]) => (
                    <Link
                        key={month}
                        href={`/album/${month}`}
                        className="block overflow-hidden rounded-xl bg-white shadow"
                    >
                        <img
                            src={items[0].imageUrl}
                            alt=""
                            className="h-40 w-full object-cover"
                        />

                        <div className="p-3">
                            <p className="font-semibold">{month}</p>
                            <p className="text-sm text-gray-500">
                                {items.length}枚
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}