import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const USER = process.env.SITE_USER ?? "edulage";
const PASSWORD = process.env.SITE_PASSWORD;

export function proxy(request: NextRequest) {
  if (!PASSWORD) return NextResponse.next();

  const header = request.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const [user, ...rest] = atob(encoded).split(":");
    if (user === USER && rest.join(":") === PASSWORD) return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="EduLage", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
