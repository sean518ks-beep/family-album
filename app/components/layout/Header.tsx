// src/components/layout/Header.tsx
import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur shadow-sm">
            <div className="mx-auto flex h-12 max-w-md items-center justify-between px-4">
                {/* 左：アプリ名 */}
                <Link
                    href="/timeline"
                    className="text-sm font-semibold text-gray-800"
                >
                    家族アルバム
                </Link>

                {/* 右：投稿ボタン */}
                <Link
                    href="/upload"
                    className="rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white"
                >
                    ＋
                </Link>
            </div>
        </header>
    );
}