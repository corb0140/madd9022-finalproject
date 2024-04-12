import { cookies } from "next/headers";

export async function GET(req) {
  const url = new URL(req.url);
  const search = new URLSearchParams(url.search);
  const token = search.get("token");

  cookies.set("token", token);
}
