import Link from "next/link";

export default function SettingsPage() {
    return (
        <main className="space-y-4 px-3 py-4">
            {/* ユーザー情報 */}
            <section className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl">
                        👤
                    </div>

                    <div>
                        <p className="font-semibold">
                            ユーザー名
                        </p>
                        <p className="text-sm text-gray-500">
                            家族アルバムへようこそ
                        </p>
                    </div>
                </div>
            </section>

            {/* 家族 */}
            <section className="rounded-2xl bg-white shadow-sm">
                <MenuItem
                    href="/settings/family"
                    title="家族一覧"
                    description="家族メンバーを確認"
                />

                <MenuItem
                    href="/settings/invite"
                    title="招待リンク"
                    description="家族を招待する"
                />
            </section>

            {/* アカウント */}
            <section className="rounded-2xl bg-white shadow-sm">
                <MenuItem
                    href="/settings/password"
                    title="パスワード変更"
                    description="ログイン情報を変更"
                />
            </section>

            {/* ログアウト */}
            <section className="rounded-2xl bg-white shadow-sm">
                <Link
                    href="/api/auth/signout"
                    className="block p-4 text-center font-medium text-red-500"
                >
                    ログアウト
                </Link>
            </section>
        </main>
    );
}

function MenuItem({
    href,
    title,
    description,
}: {
    href: string;
    title: string;
    description: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-center justify-between border-b border-gray-100 p-4 last:border-0"
        >
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500">
                    {description}
                </p>
            </div>

            <span className="text-gray-400">›</span>
        </Link>
    );
}