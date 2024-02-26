import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let authCookie = request.cookies.get(process.env.SESSION_COOKIE_NAME!)?.value;

    if (authCookie && guestPage(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/words', request.url));
    }

    if (!authCookie && userPage(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

function guestPage(pathname: string) {
    return ['/', '/login'].indexOf(pathname) > -1;
}

function userPage(pathname: string) {
    return ['/words', '/settings'].some(x => pathname.startsWith(x));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
};