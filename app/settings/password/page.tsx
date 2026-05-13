"use client";

export default function PasswordPage() {
    return (
        <main className="p-4 space-y-3">
            <h2 className="text-lg font-semibold">パスワード変更</h2>

            <input placeholder="現在のパスワード" className="w-full border p-2 rounded" />
            <input placeholder="新しいパスワード" className="w-full border p-2 rounded" />

            <button className="w-full bg-blue-500 text-white py-2 rounded">
                変更する
            </button>
        </main>
    );
}