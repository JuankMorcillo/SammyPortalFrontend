import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest): Promise<Response> {

    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/.well-known')) {
        return NextResponse.next();
    }

    const token = await getToken({
        req: request as any,
        secret: process.env.NEXTAUTH_SECRET
    });

    if (pathname === '/login') {

        if (token) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL(`/login`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|images/|audio/|.well-known).*)',
}