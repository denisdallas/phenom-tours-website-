import { GOOGLE_PLACE_ID } from "@/lib/review-links"
import type { GoogleReview } from "@/lib/review-links"

type PlacesReview = {
  name?: string
  rating?: number
  publishTime?: string
  relativePublishTimeDescription?: string
  text?: { text?: string }
  originalText?: { text?: string }
  authorAttribution?: {
    displayName?: string
    uri?: string
    photoUri?: string
  }
  googleMapsUri?: string
}

type PlacesResponse = {
  reviews?: PlacesReview[]
}

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return []

  const endpoint = new URL(
    "https://places.googleapis.com/v1/places/" + encodeURIComponent(GOOGLE_PLACE_ID),
  )
  const response = await fetch(endpoint, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "reviews",
    },
    cache: "no-store",
  })
  if (!response.ok) throw new Error("Google Maps reviews could not be loaded.")

  const payload = await response.json() as PlacesResponse
  return (payload.reviews ?? [])
    .map((review): GoogleReview | null => {
      const text = review.text?.text?.trim() ?? ""
      const rating = Number(review.rating ?? 0)
      const publishedAt = review.publishTime ?? ""
      const googleMapsUri = review.googleMapsUri?.trim() ?? ""
      const author = review.authorAttribution?.displayName?.trim() ?? ""
      const id = review.name || googleMapsUri + publishedAt + author

      if (!id || !text || !publishedAt || !author || rating < 1 || rating > 5 || !googleMapsUri) return null

      return {
        id,
        author,
        authorUri: review.authorAttribution?.uri,
        authorPhotoUri: review.authorAttribution?.photoUri,
        text,
        originalText: review.originalText?.text,
        rating,
        publishedAt,
        relativePublishedAt: review.relativePublishTimeDescription,
        googleMapsUri,
      }
    })
    .filter((review): review is GoogleReview => review !== null)
}
