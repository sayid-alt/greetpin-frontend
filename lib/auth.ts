import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Parameters<typeof NextAuth>[0] automatically grabs the exact configuration type NextAuth expects
export const {handlers , auth, signIn, signOut} = NextAuth({
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials: any) {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const user = await res.json();
            if (res.ok && user) return user;

            return null;
        }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET
});