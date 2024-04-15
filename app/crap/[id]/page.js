import CrapIdLayout from "@/app/components/CrapIdLayout/CrapIdLayout";

import { getSessions } from "@/app/actions";

export const fetchCache = "force-no-store";

export default async function page({ params }) {
  const { id } = params;

  try {
    const token = await getSessions();

    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://madd9022-finalproject.vercel.app/";

    const resp = await fetch(
      `${base}api/crapId?token=${token?.value}&id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    const data = await resp.json();

    return (
      <>
        <CrapIdLayout data={data} />
      </>
    );
  } catch (error) {
    console.error(error);
  }
}
