import type { GoogleReview, TripadvisorReview } from "@/lib/review-links"

type GoogleApiReview = {
  reviewId?: string
  name?: string
  starRating?: string
  comment?: string
  createTime?: string
  updateTime?: string
  reviewer?: {
    displayName?: string
    isAnonymous?: boolean
  }
}

type GoogleReviewsResponse = {
  reviews?: GoogleApiReview[]
}

type TripadvisorApiReview = {
  id?: string | number
  title?: string
  text?: string
  published_date?: string
  rating_image_url?: string
  rating_image?: string
  url?: string
  user?: {
    username?: string
    name?: string
  }
}

type TripadvisorReviewsResponse = {
  data?: TripadvisorApiReview[]
}

const placeholderPatterns = [
  /\blorem ipsum\b/i,
  /\bplaceholder\b/i,
  /\bsample\s+(?:review|feedback|testimonial|text)\b/i,
  /\btest(?:ing)?\s+(?:review|feedback|testimonial)\b/i,
  /\b(?:insert|add|enter|write|replace)\b.{0,40}\b(?:review|feedback|comment|text|name)\b/i,
  /\b(?:review|feedback|comment|text)\b.{0,40}\b(?:goes here|will appear here|placeholder|sample text|test text)\b/i,
  /\[\s*(?:insert|placeholder|sample|test|your\s+review)/i,
  /\{\{[^}]+\}\}/,
]

function isTemplateReview(value: string) {
  return placeholderPatterns.some(pattern => pattern.test(value))
}

function ratingNumber(value?: string) {
  const ratings: Record<string, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  }
  return value ? ratings[value] ?? 0 : 0
}

async function getGoogleAccessToken() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) return null

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  })

  if (!response.ok) throw new Error("Google Business Profile authorization failed.")

  const payload = await response.json() as { access_token?: string }
  return payload.access_token || null
}

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  const accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID
  const locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID
  if (!accountId || !locationId) return []

  const accessToken = await getGoogleAccessToken()
  if (!accessToken) return []

  const endpoint = new URL(
    "https://mybusiness.googleapis.com/v4/accounts/" +
    encodeURIComponent(accountId) +
    "/locations/" +
    encodeURIComponent(locationId) +
    "/reviews",
  )
  endpoint.searchParams.set("pageSize", "50")
  endpoint.searchParams.set("orderBy", "updateTime desc")

  const response = await fetch(endpoint, {
    headers: { Authorization: "Bearer " + accessToken },
    cache: "no-store",
  })
  if (!response.ok) throw new Error("Google Business Profile reviews could not be loaded.")

  const payload = await response.json() as GoogleReviewsResponse
  return (payload.reviews ?? [])
    .map((review): GoogleReview | null => {
      const text = review.comment?.trim() ?? ""
      const rating = ratingNumber(review.starRating)
      const publishedAt = review.createTime || review.updateTime || ""
      const id = review.reviewId || review.name || ""
      const author = review.reviewer?.isAnonymous ? "" : review.reviewer?.displayName?.trim() ?? ""

      if (!id || !text || !publishedAt || !rating || isTemplateReview(text)) return null
      return { id, author, text, rating, publishedAt }
    })
    .filter((review): review is GoogleReview => review !== null)
    .slice(0, 3)
}

function isTripadvisorUrl(value?: string) {
  if (!value) return false
  try {
    const host = new URL(value).hostname.toLowerCase()
    return host === "tripadvisor.com" || host.endsWith(".tripadvisor.com") ||
      host === "tripadvisor.co.uk" || host.endsWith(".tripadvisor.co.uk")
  } catch {
    return false
  }
}

function isTripadvisorImageUrl(value?: string) {
  if (!value) return false
  try {
    const host = new URL(value).hostname.toLowerCase()
    return host === "tripadvisor.com" || host.endsWith(".tripadvisor.com") ||
      host === "tripadvisor.co.uk" || host.endsWith(".tripadvisor.co.uk") ||
      host === "tripadvisorusercontent.com" || host.endsWith(".tripadvisorusercontent.com")
  } catch {
    return false
  }
}

export async function getTripadvisorReviews(): Promise<TripadvisorReview[]> {
  const apiKey = process.env.TRIPADVISOR_API_KEY
  const locationId = process.env.TRIPADVISOR_LOCATION_ID || "34731206"
  if (!apiKey) return []

  const endpoint = new URL(
    "https://api.content.tripadvisor.com/api/v1/location/" +
    encodeURIComponent(locationId) +
    "/reviews",
  )
  endpoint.searchParams.set("key", apiKey)
  endpoint.searchParams.set("language", "en")
  endpoint.searchParams.set("limit", "5")

  // Tripadvisor's Content API prohibits caching or indexing its review attributes.
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Phenom Tours & Travel website",
    },
    cache: "no-store",
  })
  if (!response.ok) throw new Error("Tripadvisor reviews could not be loaded.")

  const payload = await response.json() as TripadvisorReviewsResponse
  return (payload.data ?? [])
    .map((review): TripadvisorReview | null => {
      const text = review.text?.trim() ?? ""
      const title = review.title?.trim() ?? ""
      const publishedAt = review.published_date || ""
      const id = review.id === undefined ? "" : String(review.id)
      const ratingImageUrl = review.rating_image_url || review.rating_image
      const author = review.user?.username?.trim() || review.user?.name?.trim() || ""
      const url = isTripadvisorUrl(review.url) ? review.url as string : TRIPADVISOR_LISTING_URL

      if (!id || !text || !publishedAt || Number.isNaN(Date.parse(publishedAt))) return null
      if (isTemplateReview(title + " " + text)) return null

      return {
        id,
        author,
        title,
        text,
        publishedAt,
        ratingImageUrl: isTripadvisorImageUrl(ratingImageUrl) ? ratingImageUrl : undefined,
        url,
      }
    })
    .filter((review): review is TripadvisorReview => review !== null)
    .slice(0, 5)
}

import { TRIPADVISOR_LISTING_URL } from "@/lib/review-links"
