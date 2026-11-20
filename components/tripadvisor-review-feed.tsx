"use client"

import { useEffect, useState } from "react"
import type { TripadvisorReview } from "@/lib/review-links"
import { TRIPADVISOR_LISTING_URL } from "@/lib/review-links"

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function TripadvisorReviewFeed() {
  const [reviews, setReviews] = useState<TripadvisorReview[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true

    const loadReviews = async () => {
      try {
        const response = await fetch("/api/reviews/tripadvisor", { cache: "no-store" })
        if (!response.ok) throw new Error("Tripadvisor reviews unavailable.")
        const payload = await response.json() as { reviews?: TripadvisorReview[] }
        if (active) setReviews(Array.isArray(payload.reviews) ? payload.reviews : [])
      } catch {
        if (active) setReviews([])
      } finally {
        if (active) setLoaded(true)
      }
    }

    void loadReviews()
    const interval = window.setInterval(() => void loadReviews(), 6 * 60 * 60 * 1000)

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  if (!loaded) return <p className="review-status" aria-live="polite">Loading Tripadvisor reviews…</p>

  if (reviews.length === 0) {
    return <div className="review-empty"><p>Visit Tripadvisor to read Phenom’s latest traveller reviews.</p><a className="text-link" href={TRIPADVISOR_LISTING_URL} target="_blank" rel="noreferrer">Open Tripadvisor listing <span aria-hidden="true">→</span></a></div>
  }

  return <div className="tripadvisor-review-list">{reviews.map(review => (
    <article className="tripadvisor-review-card" key={review.id}>
      {review.ratingImageUrl && <div className="tripadvisor-review-rating"><img src={review.ratingImageUrl} alt="Tripadvisor traveler rating" /></div>}
      {review.title && <h2>{review.title}</h2>}
      <blockquote>“{review.text}”</blockquote>
      <div className="tripadvisor-review-attribution">Reviewed by a Tripadvisor traveler{review.author ? ": " + review.author : ""}</div>
      <div className="tripadvisor-review-footer">
        <time dateTime={review.publishedAt}>{formatDate(review.publishedAt)}</time>
        <a href={review.url} target="_blank" rel="noreferrer">Read this review on Tripadvisor</a>
      </div>
    </article>
  ))}</div>
}
