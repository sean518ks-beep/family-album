import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function TimelinePage() {
  const session = await getServerSession(authOptions);

  const posts = await prisma.post.findMany({
    where: { familyId: session.familyId },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main>
      <header>
        <h1>家族アルバム</h1>
      </header>

      {posts.map(post => (
        <img key={post.id} src={post.imageUrl} />
      ))}
    </main>
  );
}