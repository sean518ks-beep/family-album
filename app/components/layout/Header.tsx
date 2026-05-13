// src/components/layout/Header.tsx
import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-10 bg-white shadow-sm">
            <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">

                {/* 左：メニュー */}
                <Link href="/settings">
                    ☰
                </Link>

                {/* 中央 */}
                <h1 className="text-sm font-semibold">
                    家族アルバム
                </h1>

                {/* 右：投稿 */}
                <Link href="/upload">
                    ＋
                </Link>
            </div>
        </header>
    );
}
``