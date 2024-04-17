export async function GET(req) {
  try {
    const lat = req.geo.latitude ?? process.env.GEO_LAT;
    const long = req.geo.longitude ?? process.env.GEO_LONG;

    return new Response(
      JSON.stringify({
        lat: lat,
        long: long,
      })
    );
  } catch (error) {
    return new Response(error);
  }
}
