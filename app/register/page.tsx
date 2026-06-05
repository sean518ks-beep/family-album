"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [mode, setMode] = useState<"create" | "join">("create");
    const [userName, setUserName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const code = searchParams.get("code");

        if (code) {
            setMode("join");
            setInviteCode(code);
        }
    }, [searchParams]);

    const handleRegister = async () => {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mode,
                userName,
                familyName,
                inviteCode,
                email,
                password,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error ?? "登録失敗");
            return;
        }

        router.push("/login");
    };

    return (
        <main className="mx-auto mt-10 max-w-md space-y-4 rounded-xl bg-white p-6 shadow">
            <h1 className="text-center text-xl font-bold">新規登録</h1>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => setMode("create")}
                    className={`flex-1 rounded py-2 ${mode === "create" ? "bg-blue-500 text-white" : "bg-gray-100"
                        }`}
                >
                    家族を作成
                </button>

                <button
                    type="button"
                    onClick={() => setMode("join")}
                    className={`flex-1 rounded py-2 ${mode === "join" ? "bg-blue-500 text-white" : "bg-gray-100"
                        }`}
                >
                    招待コードで参加
                </button>
            </div>

            <input
                className="w-full rounded border p-2"
                placeholder="ユーザー名"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

            {mode === "create" ? (
                <input
                    className="w-full rounded border p-2"
                    placeholder="家族名（例：田中家）"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                />
            ) : (
                <input
                    className="w-full rounded border p-2"
                    placeholder="招待コード"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                />
            )}

            <input
                className="w-full rounded border p-2"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                className="w-full rounded border p-2"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="button"
                onClick={handleRegister}
                className="w-full rounded bg-blue-500 py-2 text-white"
            >
                登録
            </button>

            <p className="text-center text-sm text-gray-500">
                すでにアカウントをお持ちですか？{" "}
                <Link href="/login" className="text-blue-500 underline">
                    ログイン
                </Link>
            </p>
        </main>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>読み込み中...</div>}>
            <RegisterForm />
        </Suspense>
    );
}