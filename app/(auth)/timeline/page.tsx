// src/app/timeline/page.tsx

import Link from "next/link";

// ✅ ダミーデータ
const dummyPosts = [
  {
    id: "1",
    imageUrl: "https://placehold.co/600x600",
    user: { name: "ママ" },
    createdAt: new Date(),
  },
  {
    id: "2",
    imageUrl: "https://placehold.co/600x600",
    user: { name: "パパ" },
    createdAt: new Date(),
  },
];

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      {/* タイムライン */}
      <section className="mx-auto mt-4 max-w-md space-y-4 px-4">
        {dummyPosts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-xl bg-white shadow"
          >
            {/* 画像 */}
            <Link href={`/timeline/${post.id}`}>
              <img
                src={post.imageUrl}
                className="aspect-square w-full object-cover"
              />
            </Link>

            {/* 情報 */}
            <div className="px-3 py-2">
              <p className="text-sm font-medium">
                {post.user.name}
              </p>
              <p className="text-xs text-gray-500">
                {post.createdAt.toLocaleDateString("ja-JP")}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}