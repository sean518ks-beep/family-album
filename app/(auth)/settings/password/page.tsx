"use client";

import { useState } from "react";

export default function PasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const changePassword = async () => {
        setLoading(true);

        const res = await fetch("/api/password", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });

        const data = await res.json();

        setLoading(false);

        if (!res.ok) {
            alert(data.error ?? "変更に失敗しました");
            return;
        }

        alert("パスワードを変更しました");
        setCurrentPassword("");
        setNewPassword("");
    };

    return (
        <main className="min-h-screen bg-gray-100">
            <section className="mx-auto mt-4 max-w-md px-4">
                <div className="space-y-4 rounded-xl bg-white p-4 shadow">
                    <input
                        type="password"
                        placeholder="現在のパスワード"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full rounded border p-2"
                    />

                    <input
                        type="password"
                        placeholder="新しいパスワード"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded border p-2"
                    />

                    <button
                        onClick={changePassword}
                        disabled={loading}
                        className="w-full rounded bg-blue-500 py-2 text-white disabled:opacity-50"
                    >
                        {loading ? "変更中..." : "変更する"}
                    </button>
                </div>
            </section>
        </main>
    );
}