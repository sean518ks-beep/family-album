import Link from "next/link";

export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-gray-100">
            {/* ヘッダー */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-md items-center px-4 py-3">
                    <Link href="/timeline" className="text-lg">
                        ←
                    </Link>
                    <h1 className="mx-auto text-sm font-semibold">
                        設定
                    </h1>
                </div>
            </header>

            {/* メニュー */}
            <section className="mx-auto mt-4 max-w-md space-y-3 px-4">

                <MenuItem href="/settings/invite" title="招待リンク" description="家族を招待する" />
                <MenuItem href="/settings/password" title="パスワード変更" description="セキュリティ設定" />
                <MenuItem href="/settings/family" title="家族一覧" description="メンバー確認" />
                <MenuItem href="/settings/roles" title="役割変更" description="権限を管理する" />

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
            className="block rounded-xl bg-white p-4 shadow hover:bg-gray-50 active:scale-[0.98] transition"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>

                {/* 右矢印 */}
                <span className="text-gray-400">›</span>
            </div>
        </Link>
    );
}
