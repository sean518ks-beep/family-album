"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    };

    return (
        <button
            onClick={handleLogout}
            className="block w-full p-4 text-center font-medium text-red-500"
        >
            ログアウト
        </button>
    );
}