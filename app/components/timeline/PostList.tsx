import { PostItem } from "./PostItem";

export function PostList({ posts }) {
  return (
    <section>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </section>
  );
}