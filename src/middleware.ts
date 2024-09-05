import withAuth from "next-auth/middleware";
import { Roles } from "./lib/utils";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === Roles.ADMIN,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*", "/posts/:path*"] };
