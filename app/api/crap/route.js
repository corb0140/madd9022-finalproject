export async function GET(req) {
  const req_url = new URL(req.url);

  const lat = req.geo.latitude ?? process.env.GEO_LAT;
  const long = req.geo.longitude ?? process.env.GEO_LONG;
  const token = req_url.searchParams.get("token");
  const keyword = req_url.searchParams.get("keyword");
  const distance = req_url.searchParams.get("distance");

  try {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://madd9124-finalproject.onrender.com";

    const resp = await fetch(
      `${base}/api/crap?query=${keyword}&distance=${distance}&long=${long}&lat=${lat}&show_taken=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await resp.json();

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
