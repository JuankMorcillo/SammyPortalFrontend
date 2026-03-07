import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(request: Request): Promise<Response> {

    const token = await getToken({
        req: request as any,
        secret: process.env.NEXTAUTH_SECRET
    });

    // if (!token) {
    //     return NextResponse.redirect(new URL(`/login`, request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|images/|audio/).*)',
}