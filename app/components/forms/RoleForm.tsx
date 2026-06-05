"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RoleForm({
    memberId,
    currentRole,
    isSelf,
}: {
    memberId: string;
    currentRole: string;
    isSelf: boolean;
}) {
    const router = useRouter();
    const [role, setRole] = useState(currentRole);
    const [loading, setLoading] = useState(false);

    const updateRole = async () => {
        setLoading(true);

        const res = await fetch(`/api/family-members/${memberId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role }),
        });

        setLoading(false);

        if (!res.ok) {
            const data = await res.json();
            alert(data.error ?? "変更に失敗しました");
            return;
        }

        router.push("/settings/family");
        router.refresh();
    };

    const deleteMember = async () => {
        if (!confirm("このメンバーを削除しますか？")) return;

        const res = await fetch(`/api/family-members/${memberId}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const data = await res.json();
            alert(data.error ?? "削除に失敗しました");
            return;
        }

        router.push("/settings/family");
        router.refresh();
    };

    return (
        <div className="mt-4 space-y-4">
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isSelf}
                className="w-full rounded border p-2"
            >
                <option value="admin">管理者</option>
                <option value="editor">編集者</option>
                <option value="viewer">閲覧者</option>
            </select>

            {isSelf && (
                <p className="text-xs text-gray-500">
                    自分自身の役割は変更できません
                </p>
            )}

            <button
                onClick={updateRole}
                disabled={loading || isSelf}
                className="w-full rounded bg-blue-500 py-2 text-white disabled:opacity-50"
            >
                役割を保存
            </button>

            {!isSelf && (
                <button
                    onClick={deleteMember}
                    className="w-full rounded bg-red-500 py-2 text-white"
                >
                    メンバー削除
                </button>
            )}
        </div>
    );
}