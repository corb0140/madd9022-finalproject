import MineLayout from "../components/MineLayout/MineLayout";

import { getSessions } from "@/app/actions";

export const fetchCache = "force-no-store";

export default async function page() {
  try {
    let token = await getSessions();
    let json = atob(token?.value.split(".")[1]);
    let owner = JSON.parse(json);

    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://madd9022-finalproject.vercel.app/";

    const resp = await fetch(`${base}api/mine?token=${token?.value}`, {
      method: "GET",
    });

    const data = await resp.json();

    return (
      <div>
        <MineLayout craps={data} owner={owner.id} />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}
