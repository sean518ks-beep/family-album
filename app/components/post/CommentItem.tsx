export function CommentItem({ comment }) {
    return (
        <div>
            <strong>{comment.user.name}</strong>
            <p>{comment.content}</p>
        </div>
    );
}