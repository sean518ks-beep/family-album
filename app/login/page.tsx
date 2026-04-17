"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main>
      <h1>○○家アルバム</h1>
      <p>家族だけの非公開アルバム</p>
      <button onClick={() => signIn("google")}>
        Googleでログイン
      </button>
    </main>
  );
}