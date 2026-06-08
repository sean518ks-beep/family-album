import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { HeaderBack } from "../../../components/layout/Headerback";
import { PostDetail } from "../../../components/post/PostDetail";
import { CommentList } from "../../../components/post/CommentList";
import { CommentForm } from "../../../components/forms/CommentForm";
import { DeletePostButton } from "../../../components/post/DeletePostButton";

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.familyId) {
        redirect("/login");
    }

    const post = await prisma.post.findFirst({
        where: {
            id,
            familyId: session.familyId,
        },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
            comments: {
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    user: {
                        include: {
                            profile: true,
                        },
                    },
                },
            },
        },
    });

    if (!post) {
        redirect("/timeline");
    }

    const member = await prisma.familyMember.findFirst({
        where: {
            userId: session.user.id,
            familyId: session.familyId,
        },
    });

    const canDelete =
        post.userId === session.user.id || member?.role === "admin";

    return (
        <div className="pb-32">
            <HeaderBack title="投稿詳細" href="/timeline" />

            <div className="mx-auto max-w-screen-sm space-y-4 p-3">
                <PostDetail post={post} />

                {canDelete && (
                    <DeletePostButton postId={post.id} />
                )}

                <CommentList comments={post.comments} />
            </div>

            <CommentForm postId={post.id} />
        </div>
    );
}