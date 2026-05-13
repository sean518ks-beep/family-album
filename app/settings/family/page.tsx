// ダミーでもOK
const members = [
    { id: "1", name: "パパ", role: "管理者" },
    { id: "2", name: "ママ", role: "管理者" },
    { id: "3", name: "祖母", role: "閲覧" },
];

export default function FamilyPage() {
    return (
        <main className="p-4 space-y-3">
            <h2 className="text-lg font-semibold">家族一覧</h2>

            {members.map((m) => (
                <div key={m.id} className="rounded bg-white p-3 shadow">
                    <p>{m.name}</p>
                    <p className="text-sm text-gray-500">{m.role}</p>
                </div>
            ))}
        </main>
    );
}