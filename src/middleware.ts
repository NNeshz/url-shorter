export function middleware(request: Request) {
  // Get the cookie
  console.log(request.headers.get("cookie"));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
