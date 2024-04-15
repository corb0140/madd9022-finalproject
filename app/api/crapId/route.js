/* GET */
export async function GET(req) {
  const req_url = new URL(req.url);

  const token = req_url.searchParams.get("token");
  const id = req_url.searchParams.get("id");

  try {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://madd9124-finalproject.onrender.com";

    const resp = await fetch(`${base}/api/crap/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
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

/* DELETE */
export async function DELETE(req) {
  const req_url = new URL(req.url);

  const token = req_url.searchParams.get("token");
  const id = req_url.searchParams.get("id");

  try {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://madd9124-finalproject.onrender.com";

    const resp = await fetch(`${base}/api/crap/${id}`, {
      method: "DELETE",
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

/* POST */
export async function POST(req) {
  const req_url = new URL(req.url);

  const token = req_url.searchParams.get("token");
  const id = req_url.searchParams.get("id");

  try {
    const base =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://madd9124-finalproject.onrender.com";

    const resp = await fetch(`${base}/api/crap/${id}/interested`, {
      method: "POST",
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
