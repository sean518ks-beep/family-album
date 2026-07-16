import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/src/lib/prisma";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        Credentials({
            name: "IDとパスワード",

            credentials: {
                email: {
                    label: "メールアドレス",
                    type: "text",
                },
                password: {
                    label: "パスワード",
                    type: "password",
                },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                    include: {
                        profile: true,
                        memberships: true,
                    },
                });

                if (!user || !user.password) {
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.profile?.userName ?? "名前未設定",
                    familyId: user.memberships[0]?.familyId ?? null,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.familyId = user.familyId ?? null;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }

            session.familyId =
                typeof token.familyId === "string"
                    ? token.familyId
                    : null;

            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST,
};