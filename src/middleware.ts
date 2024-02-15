import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let userIsAuthenticated = request.cookies.get(process.env.SESSION_COOKIE_NAME!)?.value

    if (userIsAuthenticated) {
        console.log('User is authenticated')
    }

    if (request.nextUrl.pathname == '/') {
        console.log('root page')
    }

    if (request.nextUrl.pathname == '/logout') {
        let response = NextResponse.redirect(new URL('/', request.url))
        response.cookies.delete(process.env.SESSION_COOKIE_NAME!)

        return response;
    }
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