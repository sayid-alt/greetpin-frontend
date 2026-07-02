import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

export const {handlers , auth, signIn, signOut} = NextAuth({
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
        },

        async authorize(credentials: Record<string, unknown>) {
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

    callbacks: {
        async jwt ({ token, user }) {
            if (user && user.data) {
                // console.log("RAW USER FROM SPRING BOOT:", user);
                token.accessToken = user.data?.token;
                token.id = user.data?.id;
                token.expiresAtTime = user.data?.expiresAtTime;
                // console.log("TOKEN OBJECT AFTER ASSIGNMENT:", token);
            }
            return token
        },
        async session ({ session, token }) {
            // console.log("TOKEN INSIDE SESSION CALLBACK:", token);
            
            if (token) {
                session.accessToken = token.accessToken;
                session.id = token.id;
                (session.expires as string) = token.expiresAtTime as string;


                if (token.expiresAtTime) {
                    const now = Date.now();
                    const tokenExpiryTime = new Date(token.expiresAtTime as string).getTime();
                    // console.log("now: ", now)
                    // console.log("token expires: ", tokenExpiryTime)
                    if (now >= tokenExpiryTime) {
                        // console.log("Token officially expired");
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        return null as any;
                    }
                }
            }
            // console.log(session);
            // console.log("FINAL SESSION OBJECT:", session);
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET
});


export async function signup (formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");

    if (!username && !password && !email) {
        return {error: "All fieds are required"};
    }

    const requestBody = {
        "username" : username,
        "email": email,
        "password" : password,
        "roles": ["ROLE_USER"]
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
            const errorMessage = (await response).text();
            return {error: errorMessage || "Failed to sign up"}
        }

        return {success: true};
    } catch (error) {
        return { error: "Something went wrong. Please try again." };
        console.log(error); // Debugging <--
    }
}