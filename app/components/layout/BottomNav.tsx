"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white">
            <div className="mx-auto grid max-w-screen-sm grid-cols-4 py-2 text-center text-xs">

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

function NavItem({
    href,
    icon,
    label,
    active,
}: {
    href: string;
    icon: string;
    label: string;
    active: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex flex-col items-center gap-1 py-1 transition ${active
                    ? "text-blue-500 font-semibold"
                    : "text-gray-400"
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}