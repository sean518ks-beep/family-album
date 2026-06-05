import { CommentItem } from "./CommentItem";

export function CommentList({ comments }) {
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