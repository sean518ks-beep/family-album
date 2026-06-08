"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white">
            <div className="mx-auto grid max-w-screen-sm grid-cols-5 items-center py-2 text-center text-xs">
                <NavItem
                    href="/timeline"
                    icon="⌂"
                    label="タイムライン"
                    active={pathname.startsWith("/timeline")}
                />

                <NavItem
                    href="/album"
                    icon="▧"
                    label="アルバム"
                    active={pathname.startsWith("/album")}
                />

                <Link
                    href="/upload"
                    className="-mt-8 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-3xl text-white shadow-lg"
                >
                    ＋
                </Link>

                <NavItem
                    href="/settings/family"
                    icon="👥"
                    label="家族"
                    active={pathname.startsWith("/settings/family")}
                />

                <NavItem
                    href="/settings"
                    icon="⚙️"
                    label="設定"
                    active={
                        pathname.startsWith("/settings") &&
                        !pathname.startsWith("/settings/family")
                    }
                />
            </div>
        </nav>
    );
}

function NavItem({ href, icon, label, active }) {
    return (
        <Link
            href={href}
            className={`flex flex-col items-center gap-1 py-1 transition ${active ? "font-semibold text-blue-500" : "text-gray-400"
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}