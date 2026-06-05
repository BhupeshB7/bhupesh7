import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isRootPage = request.nextUrl.pathname === "/";

  if (isDashboardRoute) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decodedToken = atob(token);
      const [userId, timestamp, role] = decodedToken.split(":");

      if (!userId || !timestamp || !role) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("auth_token");
        return response;
      }

      const tokenDate = new Date(parseInt(timestamp));
      const currentDate = new Date();
      const daysDiff =
        (currentDate.getTime() - tokenDate.getTime()) / (1000 * 3600 * 24);

      if (daysDiff > 7) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("auth_token");
        return response;
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token");
      return response;
    }
  }

  if (isLoginPage && token) {
    try {
      const decodedToken = atob(token);
      const [userId, timestamp, role] = decodedToken.split(":");

      if (userId && timestamp && role) {
        const tokenDate = new Date(parseInt(timestamp));
        const currentDate = new Date();
        const daysDiff =
          (currentDate.getTime() - tokenDate.getTime()) / (1000 * 3600 * 24);

        if (daysDiff <= 7) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } catch (error) {
      return NextResponse.next();
    }
  }

  if (isRootPage && token) {
    try {
      const decodedToken = atob(token);
      const [userId, timestamp, role] = decodedToken.split(":");

      if (userId && timestamp && role) {
        const tokenDate = new Date(parseInt(timestamp));
        const currentDate = new Date();
        const daysDiff =
          (currentDate.getTime() - tokenDate.getTime()) / (1000 * 3600 * 24);

        if (daysDiff <= 7) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } catch (error) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/"],
};
