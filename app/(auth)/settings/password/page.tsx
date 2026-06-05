"use client";

import { useState } from "react";

export default function PasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    return (
        <main className="min-h-screen bg-gray-100">

            {/* 本体 */}
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

                    <button className="w-full rounded bg-blue-500 py-2 text-white">
                        変更する
                    </button>
                </div>
            </section>
        </main>
    );
}