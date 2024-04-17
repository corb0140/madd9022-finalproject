export async function GET(req) {
  const lat = process.env.GEO_LAT;
  const long = process.env.GEO_LONG;

  return new Response(
    JSON.stringify({
      lat: lat,
      long: long,
    })
  );
}
