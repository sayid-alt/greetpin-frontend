"use client"

import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const AuthExpiryWatchers = () => {
    const { data: session, status} = useSession();
    const pathname = usePathname();

    useEffect(() => {
        const publicPaths = ["/login", "/signup"]
        if (publicPaths.includes(pathname)) return;

        if (status === "unauthenticated") {
            console.warn("Spring Boot token expired globally. Evicting session...");
            signOut({ callbackUrl: "/login" })
        }
    }, [session, status, pathname]);

    return null;
};

export default AuthExpiryWatchers;