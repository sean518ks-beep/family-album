import { CommentItem } from "./CommentItem";

export function CommentList({ comments }) {
    return (
        <section>
            {comments.map((c) => (
                <CommentItem key={c.id} comment={c} />
            ))}
        </section>
    );
}