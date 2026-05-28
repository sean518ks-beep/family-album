import { TimelineTabs } from "@/app/components/timeline/TimelineTabs";
import { prisma } from "@/src/lib/prisma";

export default async function Page() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return <TimelineTabs posts={posts} />;
}