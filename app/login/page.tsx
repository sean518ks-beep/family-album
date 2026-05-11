"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-lg font-semibold">
          家族アルバム
        </h1>

        <button
          onClick={() => signIn("google")}
          className="w-full rounded-md bg-blue-500 py-2 text-white"
        >
          Googleでログイン
        </button>
      </div>
    </main>
  );
}