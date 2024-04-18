import OfferLayout from "../components/OfferLayout/OfferLayout";

export const fetchCache = "force-no-store";

export default async function page() {
  const base =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://madd9022-finalproject.vercel.app/";

  try {
    const resp = await fetch(`${base}api/geo`, {
      method: "GET",
    });

    const data = await resp.json();

    return (
      <div>
        <OfferLayout geo={data} />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}
