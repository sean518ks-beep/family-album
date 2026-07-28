"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            setError("メールアドレスとパスワードを入力してください");
            return;
        }

        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (!result?.ok) {
            setError("メールアドレスまたはパスワードが違います");
            return;
        }

        window.location.href = "/timeline";
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow">
                <h1 className="text-center text-lg font-semibold">
                    家族アルバム
                </h1>

                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border p-2"
                />

                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            void handleLogin();
                        }
                    }}
                    className="w-full rounded border p-2"
                />

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                    type="button"
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full rounded bg-blue-500 py-2 text-white disabled:opacity-50"
                >
                    {loading ? "ログイン中..." : "ログイン"}
                </button>

                <p className="text-center text-sm text-gray-500">
                    はじめてですか？{" "}
                    <Link href="/register" className="text-blue-500 underline">
                        新規登録
                    </Link>
                </p>
            </div>
        </main>
    );
}
