import CrapLayout from "../components/CrapLayout/CrapLayout";

import { getSessions } from "@/app/actions";

export default async function page({ searchParams }) {
  const keyword = new URLSearchParams(searchParams).get("keyword");
  const distance = new URLSearchParams(searchParams).get("distance");

  const token = await getSessions();
  let json = atob(token?.value.split(".")[1]);
  let owner = JSON.parse(json);

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

    return <CrapLayout data={data} token={owner.id} />;
  } catch (error) {
    console.error(error);
  }
}
