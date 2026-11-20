"use client"

import { useEffect, useState } from "react"
import type { GoogleReview } from "@/lib/review-links"
import { GOOGLE_PROFILE_URL } from "@/lib/review-links"

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function GoogleReviewFeed() {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true

    const loadReviews = async () => {
      try {
        const response = await fetch("/api/reviews/google", { cache: "no-store" })
        if (!response.ok) throw new Error("Google reviews unavailable.")
        const payload = await response.json() as { reviews?: GoogleReview[] }
        if (active) setReviews(Array.isArray(payload.reviews) ? payload.reviews : [])
      } catch {
        if (active) setReviews([])
      } finally {
        if (active) setLoaded(true)
      }
    }

    void loadReviews()
    const interval = window.setInterval(() => void loadReviews(), 60 * 60 * 1000)

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  if (!loaded) return <p className="review-status" aria-live="polite">Loading the latest Google reviews…</p>

  if (reviews.length === 0) {
    return <div className="review-empty"><p>Read the latest guest feedback directly on our Google profile.</p><a className="text-link" href={GOOGLE_PROFILE_URL} target="_blank" rel="noreferrer">View Google reviews <span aria-hidden="true">→</span></a></div>
  }

  return <div className="review-grid">{reviews.map(review => (
    <figure className="review-card" key={review.id}>
      <div className="review-stars" aria-label={review.rating + " out of 5 stars"}>{"★".repeat(review.rating)}</div>
      <blockquote>“{review.text}”</blockquote>
      <figcaption>
        {review.author ? <strong>{review.author}</strong> : <strong>Anonymous Google reviewer</strong>}
        <span>Google review · {formatDate(review.publishedAt)}</span>
      </figcaption>
      <a className="review-source-link" href={GOOGLE_PROFILE_URL} target="_blank" rel="noreferrer">View on Google</a>
    </figure>
  ))}</div>
}
