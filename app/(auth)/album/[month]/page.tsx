import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { HeaderBack } from "@/app/components/layout/Headerback";

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

    const [year, monthText] = month.split("-");
    const yearNum = Number(year);
    const monthNum = Number(monthText);

    const start = new Date(yearNum, monthNum - 1, 1);
    const end = new Date(yearNum, monthNum, 1);

    const posts = await prisma.post.findMany({
        where: {
            familyId: session.familyId,
            createdAt: {
                gte: start,
                lt: end,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div>
            <HeaderBack title={`${yearNum}年${monthNum}月`} href="/album" />

            <div className="grid grid-cols-3 gap-1 p-1">
                {posts.map((post) => (
                    <Link key={post.id} href={`/timeline/${post.id}`}>
                        <img
                            src={post.imageUrl}
                            alt=""
                            className="aspect-square w-full object-cover"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}