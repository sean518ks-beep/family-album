import Link from "next/link";

type HeaderBackProps = {
    title: string;
    href?: string;
};

export function HeaderBack({
    title,
    href = "/settings",
}: HeaderBackProps) {
    return (
        <header className="sticky top-0 z-20 bg-white shadow-sm">
            <div className="mx-auto flex max-w-screen-sm items-center px-4 py-3">
                {/* 戻る */}
                <Link
                    href={href}
                    className="text-lg font-medium"
                >
                    ←
                </Link>

                {/* タイトル */}
                <h1 className="flex-1 text-center text-sm font-semibold">
                    {title}
                </h1>

                {/* 左右バランス調整 */}
                <div className="w-5" />
            </div>
        </header>
    );
}