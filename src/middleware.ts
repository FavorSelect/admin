import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token_middleware")?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/login";
  const isPublicRoute = isLoginPage;

  // If logged-in user tries to access login, redirect to dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If no token and trying to access any non-public page, redirect to login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
