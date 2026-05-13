"use client";

import Link from "next/link";
import { useState } from "react";

export default function InvitePage() {
    const [copied, setCopied] = useState(false);

    // 仮リンク（あとでAPIで生成）
    const inviteLink = "https://example.com/invite/abc123";

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(inviteLink);
        setCopied(true);

        // 2秒後戻す
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-gray-100">
            {/* ヘッダー */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-md items-center px-4 py-3">
                    <Link href="/settings" className="text-lg">
                        ←
                    </Link>
                    <h1 className="mx-auto text-sm font-semibold">
                        招待リンク
                    </h1>
                </div>
            </header>

            {/* 本体 */}
            <section className="mx-auto mt-6 max-w-md px-4">
                <div className="space-y-4 rounded-xl bg-white p-4 shadow">

                    <p className="text-sm text-gray-600">
                        このリンクを家族に送ると参加できます
                    </p>

                    {/* リンク表示 */}
                    <div className="rounded-md border p-2 text-sm break-all">
                        {inviteLink}
                    </div>

                    {/* コピー */}
                    <button
                        onClick={copyToClipboard}
                        className="w-full rounded-md bg-blue-500 py-2 text-white"
                    >
                        {copied ? "コピーしました！" : "リンクをコピー"}
                    </button>
                </div>
            </section>
        </main>
    );
}
