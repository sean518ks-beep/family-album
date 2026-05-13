"use client";

export default function RolesPage() {
    return (
        <main className="p-4 space-y-3">
            <h2 className="text-lg font-semibold">役割変更</h2>

            <div className="rounded bg-white p-3 shadow">
                <p>祖母</p>
                <select className="mt-1 w-full border p-2 rounded">
                    <option>閲覧のみ</option>
                    <option>投稿可</option>
                    <option>管理者</option>
                </select>
            </div>
        </main>
    );
}