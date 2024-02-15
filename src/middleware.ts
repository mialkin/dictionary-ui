import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    if (request.nextUrl.pathname == '/logout') {
        let response = NextResponse.redirect(new URL('/', request.url))
        response.cookies.delete(process.env.SESSION_COOKIE_NAME!)

        return response;
    }

    let user = request.cookies.get(process.env.SESSION_COOKIE_NAME!)?.value

    if (user && pageForGuests(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/words', request.url))
    }

    if (!user && pageForUsers(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

function pageForGuests(pathname: string) {
    let guestPaths: string[] = ['/', '/login']

    return guestPaths.indexOf(pathname) > -1
}

function pageForUsers(pathname: string) {
    let userPaths: string[] = ['/words', '/settings']

    return userPaths.some(x => pathname.startsWith(x))
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}