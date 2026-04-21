import type { APIRoute } from "astro";
import { getConfirmed } from "../../../lib/cumple-35/db";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const confirmed = await getConfirmed();
    return new Response(JSON.stringify(confirmed), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
      },
    });
  } catch (err) {
    console.error("confirmed read failed", err);
    return new Response(
      JSON.stringify({ count: 0, maybeCount: 0, names: [], guests: [] }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
