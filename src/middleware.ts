export function middleware(request: Request) {
  // Get the cookie
  console.log("Hola como estas");
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
