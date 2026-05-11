"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow">
        <h1 className="text-center text-lg font-semibold">
          家族アルバム
        </h1>

        {/* ID・パスワードログイン */}
        <input
          type="email"
          placeholder="メールアドレス"
          className="w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="パスワード"
          className="w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() =>
            signIn("credentials", {
              email,
              password,
              callbackUrl: "/timeline",
            })
          }
          className="w-full rounded bg-blue-500 py-2 text-white"
        >
          ログイン
        </button>

        {/* 新規登録 */}
      <p className="text-center text-sm text-gray-500">
        はじめてですか？{" "}
        <Link href="/register" className="text-blue-500 underline">
          新規登録
        </Link>
      </p>

      {/* 区切り */}
      <div className="text-center text-xs text-gray-400">または</div>

      {/* Googleログイン */}
      <button
        onClick={() => signIn("google")}
        className="w-full rounded bg-red-500 py-2 text-white"
      >
        Googleでログイン
      </button>
    </div>
    </main >
  );
}