import Link from "next/link";

export function PostItem({ post }) {
  return (
    <article>
      <Link href={`/post/${post.id}`}>
        {post.imageUrl}
      </Link>
      <p>{post.user.name}</p>
      <p>{post.createdAt.toLocaleDateString()}</p>
    </article >
  );
}
