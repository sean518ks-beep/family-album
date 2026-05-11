import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Header } from "@/app/components/layout/Header";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

export default async function TimelinePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const posts = await prisma.post.findMany({
    where: { familyId: session.familyId },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <Header />

      {/* タイムライン */}
      <section className="mx-auto mt-4 max-w-md space-y-4 px-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-xl bg-white shadow"
          >
            {/* 写真 */}
            <Image
              src={post.imageUrl}
              alt=""
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />

            {/* 情報 */}
            <div className="px-3 py-2">
              <p className="text-sm font-medium">
                {post.user?.name ?? "家族"}
              </p>
              <p className="text-xs text-gray-500">
                {post.createdAt.toLocaleDateString()}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}