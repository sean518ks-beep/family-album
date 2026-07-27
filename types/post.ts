import type { Prisma } from "@/app/generated/prisma/client";

export type PostWithUser = Prisma.PostGetPayload<{
    include: {
        user: {
            include: {
                profile: true;
            };
        };
    };
}>;

export type TimelinePost = Prisma.PostGetPayload<{
    include: {
        user: {
            include: {
                profile: true;
            };
        };
        comments: true;
        likes: true;
    };
}> & {
    currentUserId: string;
};

export type CommentWithUser = Prisma.CommentGetPayload<{
    include: {
        user: {
            include: {
                profile: true;
            };
        };
    };
}>;
