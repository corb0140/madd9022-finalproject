import CrapIdLayout from "@/app/components/CrapIdLayout/CrapIdLayout";

import { getSessions } from "@/app/actions";

export const fetchCache = "force-no-store";

export default async function page({ params }) {
  const { id } = params;

  try {
    const token = await getSessions();
    let json = atob(token?.value.split(".")[1]);
    let owner = JSON.parse(json);

    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://madd9022-finalproject.vercel.app/";

    const resp = await fetch(
      `${base}api/crapId?token=${token?.value}&id=${id}`,
      {
        method: "GET",
      }
    );
    const data = await resp.json();

    return (
      <>
        <CrapIdLayout data={data} owner={owner.id} />
      </>
    );
  } catch (error) {
    console.error(error);
  }
}
