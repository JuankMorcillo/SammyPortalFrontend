import { NextResponse } from "next/server";

export async function proxy(request: Request): Promise<Response> {
    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|images/|audio/).*)',
}