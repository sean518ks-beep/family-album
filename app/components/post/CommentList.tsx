import { CommentWithUser } from "../../../types/post";
import { CommentItem } from "./CommentItem";

type CommentListProps = {
    comments: CommentWithUser[];
};

export function CommentList({
    comments,
}: CommentListProps) {
    if (comments.length === 0) {
        return (
            <p className="text-center text-sm text-gray-500">
                まだコメントはありません
            </p>
        );
    }

    return (
        <section className="space-y-2">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                />
            ))}
        </section>
    );
}