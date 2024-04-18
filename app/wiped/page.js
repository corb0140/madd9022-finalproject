import WipedLayout from "../components/WipedLayout/WipedLayout";

import { getSessions } from "@/app/actions";

export const fetchCache = "force-no-store";

export default async function page() {
  let token = await getSessions();

  try {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://madd9022-finalproject.vercel.app/";

    const resp = await fetch(`${base}/api/mine?token=${token?.value}`, {
      method: "GET",
    });

    const data = await resp.json();

    return (
      <div>
        <WipedLayout data={data} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
