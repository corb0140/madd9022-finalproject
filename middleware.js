import { NextResponse } from "next/server";
import { updateSession, logout, login } from "@/app/actions";

export default async function middleware(req) {
  let response = await updateSession(req); //updateSession function in actions

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (!response) {
      response = NextResponse.next();
    }

    if (req.nextUrl.searchParams.has("token")) {
      await login(response, req.nextUrl.searchParams.get("token")); //function from actions.js
    }
    return response;
  }

  if (req.nextUrl.pathname === "/") {
    if (!response) {
      response = NextResponse.next();
    }
    return response;
  }
}

export const config = {
  matcher: ["/", "/login"],
};
