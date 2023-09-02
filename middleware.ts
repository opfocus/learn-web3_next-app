import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("./home", request.url))
}

export const config = {
  matcher: "/about/:path*",   //可以用数组匹配多个路径
}