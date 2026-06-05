"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "../../../components/layout/AppHeader";

export default function InvitePage() {
    const [copied, setCopied] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchInvite() {
            try {
                const res = await fetch("/api/invite");
                const data = await res.json();

                if (!res.ok) {
                    setError(data.error ?? "招待リンクの取得に失敗しました");
                    return;
                }

                setInviteLink(data.inviteLink);
            } catch (error) {
                console.error(error);
                setError("招待リンクの取得に失敗しました");
            }
        }

        fetchInvite();
    }, []);

    const copyToClipboard = async () => {
        if (!inviteLink) return;

        await navigator.clipboard.writeText(inviteLink);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-gray-100">
            <AppHeader title="招待リンク" />

            <section className="mx-auto mt-6 max-w-md px-4">
                <div className="space-y-4 rounded-xl bg-white p-4 shadow">
                    <p className="text-sm text-gray-600">
                        このリンクを家族に送ると参加できます
                    </p>

                    <div className="rounded-md border p-2 text-sm break-all">
                        {error ? (
                            <span className="text-red-500">{error}</span>
                        ) : inviteLink ? (
                            inviteLink
                        ) : (
                            "読み込み中..."
                        )}
                    </div>

                    <button
                        onClick={copyToClipboard}
                        disabled={!inviteLink}
                        className="w-full rounded-md bg-blue-500 py-2 text-white disabled:opacity-50"
                    >
                        {copied ? "コピーしました！" : "リンクをコピー"}
                    </button>
                </div>
            </section>
        </main>
    );
}