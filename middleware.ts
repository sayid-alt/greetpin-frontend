import { auth } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: any) => {
    const isLoggedIn = !!req.auth;
    const isOnloginPage = req.nextUrl.pathname === "/login";

    if (!isLoggedIn && !isOnloginPage) {
        return Response.redirect(new URL("/login", req.nextUrl));
    }

    if (isLoggedIn && isOnloginPage) {
        return Response.redirect(new URL("/", req.nextUrl));
    }
})

export const config = {
        matcher : [
            /*
            * Match all request paths except for the ones starting with:
            * - api (API routes)
            * - _next/static (static files)
            * - _next/image (image optimization files)
            * - favicon.ico (favicon file)
            */
            // "/((?!api|_next/static|_next/image|favicon.ico).*)",
            "/((?!api/auth|_next/static).*)",
        ]
    }