import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import client from "@/app/db";

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }: { user: User }) {
            const existingUser = await client.user.findUnique({
                where: { email: user.email! },
            });
            if (!existingUser) {
                await client.user.create({
                    data: {
                        name: user.name || "No Name",
                        username: `user_${Math.random().toString(36).substring(7)}`,
                        email: user.email!,
                        password: "******", 
                        phonenumber: "999999999",
                        profession: "enter your profession",
                    },
                });
            }
            return true;
        },
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                const dbuser = await client.user.findUnique({
                    where: { email: user.email! },
                });
                token.uid = dbuser?.id;
            }
            return token;
        },
        session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                (session.user as any).id = token.uid; 
            }
            return session;
        },
    },

    pages: {
        signIn: "auth/user/signin",
    },
};
