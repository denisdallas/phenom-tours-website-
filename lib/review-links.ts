export const GOOGLE_PROFILE_URL = "https://share.google/B0HuP2cFuXEjVhyvs"
export const TRIPADVISOR_LISTING_URL = "https://www.tripadvisor.co.uk/Attraction_Review-g16740622-d34731206-Reviews-Phenom_Tours_and_Travel-Matugga_Central_Region.html"

export type GoogleReview = {
  id: string
  author: string
  text: string
  rating: number
  publishedAt: string
}

export type TripadvisorReview = {
  id: string
  author: string
  title: string
  text: string
  publishedAt: string
  ratingImageUrl?: string
  url: string
}
