import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/src/lib/prisma";

export const authOptions = {
    providers: [
        // ✅ Googleログイン
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // ✅ ID / パスワードログイン
        Credentials({
            name: "IDとパスワード",
            credentials: {
                email: { label: "メールアドレス", type: "text" },
                password: { label: "パスワード", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                // ユーザーがいない / passwordがない
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

                // ✅ 認証成功
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    familyId: user.familyId,
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
                token.familyId = user.familyId;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.familyId) {
                session.familyId = token.familyId;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };