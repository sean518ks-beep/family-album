import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";
import { TimelineTabs } from "@/app/components/timeline/TimelineTabs";

export const dynamic = "force-dynamic";

export default async function TimelinePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.familyId) {
    redirect("/login");
  }

  const member = await prisma.familyMember.findFirst({
    where: {
      userId: session.user.id,
      familyId: session.familyId,
    },
  });

  const canPost =
    member?.role === "admin" ||
    member?.role === "editor";

  const posts = await prisma.post.findMany({
    where: {
      familyId: session.familyId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      comments: true,
      likes: true,
    },
  });

  const postsWithCurrentUser = posts.map((post) => ({
    ...post,
    currentUserId: session.user.id,
  }));

  return (
    <TimelineTabs
      posts={postsWithCurrentUser}
      canPost={canPost}
    />
  );
}