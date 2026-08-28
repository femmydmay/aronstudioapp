import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * ✅ NEVER TOUCH SYSTEM FILES
   */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  /**
   * ✅ PUBLIC ROUTES
   */
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return NextResponse.next();
  }

  /**
   * ✅ CHECK AUTH TOKEN
   */
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  /**
   * ✅ AUTH OK
   */
  return NextResponse.next();
}

/**
 * ✅ MATCHER (unchanged)
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};