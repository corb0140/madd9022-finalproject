import { geolocation } from "@vercel/edge";

export function GET(req) {
  const { latitude, longitude } = geolocation(req);

  try {
    const long = longitude ?? process.env.GEO_LONG;
    const lat = latitude ?? process.env.GEO_LAT;

    return new Response(JSON.stringify({ long: long, lat: lat }));
  } catch (error) {
    return new Response(error);
  }
}
