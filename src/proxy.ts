import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["vi", "en"];

const defaultLocale = "vi";

const publicRoutes = [
  "/",
  "/home",
  "/login",
  "/register",
  "/forgot-password",
  "/blog",
  "/pricing",
  "/faq",
  "/contact",
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/home`, request.url),
    );
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  const segments = pathname.split("/");

  const currentLocale = segments[1];

  const pathnameWithoutLocale = "/" + segments.slice(2).join("/");

  const token = request.cookies.get("token")?.value;

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathnameWithoutLocale === route ||
      pathnameWithoutLocale.startsWith(route + "/"),
  );

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/login`, request.url),
    );
  }

  if (token && isPublicRoute && pathnameWithoutLocale === "/login") {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/dashboard`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|icons|.*\\..*).*)",
  ],
};
