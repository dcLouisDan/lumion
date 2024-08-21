import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log("PATHNAME: ", request.nextUrl.pathname)
    if (request.nextUrl.pathname.startsWith("/auth") && !!request.nextauth.token) {
      return NextResponse.rewrite(new URL("/dashboard", request.url))
    }
  },
  {
    callbacks:{
      authorized: ({token}) => !!token
    }
  }
)

export const config = {matcher: ["/dashboard", "/auth"]}