import { TimelineTabs } from "@/app/components/timeline/TimelineTabs";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const familyId = session.familyId;

  if (!familyId) {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
    where: {
      familyId,
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
    },
  });

  return <TimelineTabs posts={posts} />;
}