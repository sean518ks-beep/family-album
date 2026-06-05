import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";
import { AppHeader } from "../../../components/layout/AppHeader";

export default async function FamilyPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.familyId) {
        redirect("/login");
    }

    const currentMember = await prisma.familyMember.findFirst({
        where: {
            userId: session.user.id,
            familyId: session.familyId,
        },
    });

    const isAdmin = currentMember?.role === "admin";

    const members = await prisma.familyMember.findMany({
        where: {
            familyId: session.familyId,
        },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return (
        <main className="min-h-screen bg-gray-100">
            <AppHeader title="家族一覧" />

            <section className="mx-auto mt-4 max-w-md space-y-3 px-4">
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="rounded-xl bg-white p-4 shadow"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                    👤
                                </div>

                                <div>
                                    <p className="font-medium">
                                        {member.user.profile?.userName ?? "名前未設定"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {member.role === "admin"
                                            ? "管理者"
                                            : member.role === "editor"
                                                ? "編集者"
                                                : "閲覧者"}
                                    </p>
                                </div>
                            </div>

                            {isAdmin && (
                                <Link
                                    href={`/settings/roles/${member.id}`}
                                    className="rounded border px-3 py-1 text-sm text-blue-500"
                                >
                                    変更
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}