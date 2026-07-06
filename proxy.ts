import { auth } from "@/service/auth";

export default auth((req) => {
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
            "/((?!api/auth|_next/static|signup).*)",
        ]
    }