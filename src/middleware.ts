import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    // if (request.nextUrl.pathname == '/logout') {
    //     let response = NextResponse.redirect(new URL('/', request.url));
    //     response.cookies.delete(process.env.SESSION_COOKIE_NAME!);
    //
    //     return response;
    // }
    //
    // let userSession = request.cookies.get(process.env.SESSION_COOKIE_NAME!)?.value;
    //
    // if (userSession && unauthorizedPage(request.nextUrl.pathname)) {
    //     return NextResponse.redirect(new URL('/words', request.url));
    // }
    //
    // if (!userSession && authorizedPage(request.nextUrl.pathname)) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
}

function unauthorizedPage(pathname: string) {
    return ['/', '/login'].indexOf(pathname) > -1;
}

function authorizedPage(pathname: string) {
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