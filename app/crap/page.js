import CrapLayout from "../components/CrapLayout/CrapLayout";

import { getSessions } from "@/app/actions";

export default async function page({ searchParams }) {
  const keyword = new URLSearchParams(searchParams).get("keyword");
  const distance = new URLSearchParams(searchParams).get("distance");

  const token = await getSessions();

  try {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://madd9022-finalproject.vercel.app/";

    const response = await fetch(
      `${base}api/crap?keyword=${keyword}&distance=${distance}&token=${token?.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    const data = await response.json();

    return <CrapLayout data={data} />;
  } catch (error) {
    console.error(error);
  }
}
