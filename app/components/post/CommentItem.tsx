type CommentItemProps = {
    comment: {
        id: string;
        content: string;
        user: {
            profile: {
                userName: string;
            } | null;
        };
    };
};

export function CommentItem({
    comment,
}: CommentItemProps) {
    return (
        <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-sm font-semibold">
                {comment.user.profile?.userName ?? "名前未設定"}
            </p>

            <p className="mt-1 text-sm text-gray-700">
                {comment.content}
            </p>
        </div>
    );
}