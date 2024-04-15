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

    const getResp = await fetch(
      `${base}api/crapId?token=${token?.value}&id=${id}`,
      {
        method: "GET",
      }
    );
    const data = await getResp.json();

    // await fetch(`${base}api/crapId?token=${token?.value}&id=${id}`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${token?.value}`,
    //   },
    // });

    return (
      <>
        <CrapIdLayout data={data} id={token?.value} />
      </>
    );
  } catch (error) {
    console.error(error);
  }
}
