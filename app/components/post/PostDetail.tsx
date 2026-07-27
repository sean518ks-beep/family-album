import { PostWithUser } from "../../../types/post";

type PostDetailProps = {
    post: PostWithUser;
};

export function PostDetail({ post }: PostDetailProps) {
    return (
        <article className="overflow-hidden rounded-xl bg-white shadow-sm">
            {post.mediaType === "video" ? (
                <video
                    src={post.imageUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full bg-black"
                />
            ) : (
                <img
                    src={post.imageUrl}
                    alt={post.title ?? "投稿画像"}
                    className="w-full object-cover"
                />
            )}

            <div className="p-4">
                <p className="font-semibold">
                    {post.user.profile?.userName ?? "名前未設定"}
                </p>

                <p className="text-sm text-gray-500">
                    {post.createdAt.toLocaleDateString("ja-JP")}
                </p>

                {post.title && (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
                        {post.title}
                    </p>
                )}
            </div>
        </article>
    );
}
