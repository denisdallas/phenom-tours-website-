import { getTripadvisorReviews } from "@/lib/reviews"

export const dynamic = "force-dynamic"

const responseHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  "X-Robots-Tag": "noindex, nofollow, nosnippet",
}

export async function GET() {
  try {
    const reviews = await getTripadvisorReviews()
    return Response.json({ reviews }, { headers: responseHeaders })
  } catch {
    return Response.json({ reviews: [] }, { status: 503, headers: responseHeaders })
  }
}
