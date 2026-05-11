export function PostDetail({ post }) {
    return (
        <article>
            {post.imageUrl}
            <p>{post.user.name}</p>
        </article>
    );
}