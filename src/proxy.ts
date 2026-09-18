import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/constants/auth";

const PROTECTED_PATHS = [
  "/deposit",
  "/withdraw",
  "/bet-history",
  "/my-page",
  "/messages",
  "/inquiries",
  "/announcement",
  "/game_casino",
  "/game_slot",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (!isProtected) return NextResponse.next();

  const hasAuth = request.cookies.get(AUTH_COOKIE_NAME)?.value === "1";
  if (hasAuth) return NextResponse.next();

  const loginUrl = new URL("/", request.url);
  loginUrl.searchParams.set("login", "1");
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/deposit/:path*",
    "/withdraw/:path*",
    "/bet-history/:path*",
    "/my-page/:path*",
    "/messages/:path*",
    "/inquiries/:path*",
    "/announcement/:path*",
    "/game_casino/:path*",
    "/game_slot/:path*",
  ],
};
