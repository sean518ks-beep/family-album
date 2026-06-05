import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        console.log("INVITE SESSION:", session);

        if (!session?.familyId) {
            return NextResponse.json(
                { error: "familyId がありません" },
                { status: 401 }
            );
        }

        let invitation = await prisma.invitation.findFirst({
            where: {
                familyId: session.familyId,
            },
        });

        if (!invitation) {
            invitation = await prisma.invitation.create({
                data: {
                    code: crypto.randomUUID().slice(0, 8),
                    familyId: session.familyId,
                },
            });
        }

        const appUrl =
            process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

        const inviteLink = `${appUrl}/register?code=${invitation.code}`;

        return NextResponse.json({
            inviteLink,
            code: invitation.code,
        });
    } catch (error) {
        console.error("INVITE API ERROR:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "招待リンク取得に失敗しました",
            },
            { status: 500 }
        );
    }
}