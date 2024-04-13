"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function login(response, token) {
  //set the cookie
  console.log("login", token);
  const expires = new Date(Date.now() + 30 * 1000); //this is the expiration date of the cookie

  await response.cookies.set("token", token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires: expires,
  });
}

export async function logout() {
  await cookies().delete("token"); //clear the cookie
}

export async function getSessions() {
  const token = await cookies().get("token");

  console.log(
    "getSession -",
    token?.value,
    token?.value ? "has cookie token" : "no cookie token"
  );

  if (!token) return null;
  revalidatePath("/");
  return token;
}

export async function updateSession(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    console.log("updateSession - no token cookie");
  }
  if (!token) return;

  const expires = new Date(Date.now() + 30 * 1000);
  const resp = NextResponse.next();
  resp.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    expires: expires,
  });
  return resp;
}
