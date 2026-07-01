import { DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt"


declare module "next-auth" {
    interface User extends DefaultUser {
        data?: {
            id: number;
            username: string;
            password: string;
            token: string;
            expiresAtTime: string;
            role: string[];
        },
        success?: boolean;
        message?: string;
        timestamp?: string;
    }

    interface Session {
        id?: number;
        accessToken?: string;
        expires?: string;
        user?: {
            id?: number;
        }
    }
} 

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string;
        id?: number;
        expiresAtTime?: string;
    }
}