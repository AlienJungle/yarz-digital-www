import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authedUrlBase = ["/tutoring/dashboard"];

  if (!request.cookies.get("session")) {
    const loginRedirect = authedUrlBase.some((x) => request.nextUrl.pathname.startsWith(x));
    console.log(loginRedirect);
    if (loginRedirect) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL + "/tutoring/login");
    }
  }
}

export const config = {
  matcher: "/tutoring/:path*",
};
