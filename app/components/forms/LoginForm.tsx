"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            setError("メールアドレスとパスワードを入力してください");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const result = await signIn("credentials", {
                email: email.trim(),
                password,
                redirect: false,
            });

            if (!result) {
                setError("ログイン処理に失敗しました");
                return;
            }

            if (result.error) {
                setError("メールアドレスまたはパスワードが違います");
                return;
            }

            router.push("/timeline");
            router.refresh();
        } catch (error) {
            console.error("LOGIN ERROR:", error);
            setError("ログイン中にエラーが発生しました");
        } finally {
            setLoading(false);
        }
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
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded border p-2"
                />

                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !loading) {
                            void handleLogin();
                        }
                    }}
                    className="w-full rounded border p-2"
                />

                {error && (
                    <p
                        role="alert"
                        className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                    >
                        {error}
                    </p>
                )}

                <button
                    type="button"
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full rounded bg-blue-500 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
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
