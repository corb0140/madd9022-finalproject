"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function login(response, token) {
  const expires = new Date(Date.now() + 30 * 60 * 1000); //this is the expiration date of the cookie

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

export async function getCrap(form) {
  "use server";

  const keyword = form.get("keyword");
  const distance = form.get("distance");

  redirect(`./crap?keyword=${keyword}&distance=${distance}`);
}

// POST CRAP
export async function postCrap(form) {
  "use server";

  try {
    let token = await getSessions();
    let json = atob(token?.value.split(".")[1]);
    let owner = JSON.parse(json);

    const title = form.get("title");
    const description = form.get("description");
    const image = form.get("image");

    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://vercel.com/madd9022/finalproject/";

    const res = await fetch(`${base}api/geo`);

    const geo = await res.json();

    // console.log(geo.lat);
    // console.log(geo.long);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("images", image);
    formData.append("owner", owner.id);
    formData.append("location[coordinates][]", geo.long);
    formData.append("location[coordinates][]", geo.lat);
    formData.append("status", "AVAILABLE");

    const base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://madd9124-finalproject.onrender.com";

    const resp = await fetch(`${base_url}/api/crap`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      body: formData,
    });

    const data = await resp.json();

    console.log(data);
  } catch (error) {
    return new Response(error);
  } finally {
    redirect("/mine");
  }
}

// POST SUGGESTION
export async function makeSuggestion(form) {
  "use server";

  try {
    let token = await getSessions();

    const id = form.get("id");
    const address = form.get("address");
    const date = form.get("date");
    const time = form.get("time");

    const base_url =
      process.env.NODE_ENV === "development"
        ? `http://localhost:4000`
        : `https://madd9124-finalproject.onrender.com`;

    await fetch(`${base_url}/api/crap/${id}/suggest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify({
        address: address,
        date: date,
        time: time,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}
