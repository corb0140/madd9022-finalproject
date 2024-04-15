"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function login(response, token) {
  //set the cookie

  const expires = new Date(Date.now() + 30 * 60 * 1000); //this is the expiration date of the cookie

  // cookie expires in 5 minutes
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

  const expires = new Date(Date.now() + 30 * 60 * 1000);
  const resp = NextResponse.next();
  resp.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    expires: expires,
  });
  return resp;
}

export async function postCrap(form) {
  "use server";

  try {
    let token = await getSessions();
    let json = atob(token?.value.split(".")[1]);
    let owner = JSON.parse(json);

    const title = form.get("title");
    const description = form.get("description");
    const image = form.get("image");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("images", image);
    formData.append("owner", owner.id);
    formData.append("location[coordinates][]", 63.33);
    formData.append("location[coordinates][]", 33.45);
    formData.append("status", "AVAILABLE");

    const base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000/api/crap"
        : "https://madd9124-finalproject.onrender.com/api/crap";

    const resp = await fetch(`${base_url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      body: formData,
    });

    const data = await resp.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    redirect("/mine");
  }
}

export async function makeSuggestion(form) {}
