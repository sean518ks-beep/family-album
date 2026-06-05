import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";
import { RoleForm } from "../../../../components/forms/RoleForm";
import { HeaderBack } from "../../../../components/layout/Headerback";

export default async function RolePage({
    params,
}: {
    params: Promise<{ memberId: string }>;
}) {
    const { memberId } = await params;

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

    if (currentMember?.role !== "admin") {
        redirect("/settings/family");
    }

    const targetMember = await prisma.familyMember.findUnique({
        where: {
            id: memberId,
        },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
    });

    if (!targetMember || targetMember.familyId !== session.familyId) {
        redirect("/settings/family");
    }

    return (
        <main className="min-h-screen bg-gray-100">
            <HeaderBack
                title="役割変更"
                href="/settings/family"
            />

            <section className="mx-auto mt-4 max-w-md px-4">
                <div className="rounded-xl bg-white p-4 shadow">
                    <p className="font-medium">
                        {targetMember.user.profile?.userName ?? "名前未設定"}
                    </p>

                    <RoleForm
                        memberId={targetMember.id}
                        currentRole={targetMember.role}
                        isSelf={targetMember.userId === session.user.id}
                    />
                </div>
            </section>
        </main>
    );
}