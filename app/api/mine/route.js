export async function GET(req) {
  const req_url = new URL(req.url);

  const token = req_url.searchParams.get("token");

  try {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://madd9124-finalproject.onrender.com";

    const resp = await fetch(`${base}/api/crap/mine`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
