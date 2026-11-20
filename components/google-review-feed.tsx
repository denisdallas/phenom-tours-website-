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

    return () => {
      active = false
    }
  }, [])

  if (!loaded) return <p className="review-status" aria-live="polite">Loading the latest Google Maps reviews…</p>

  if (reviews.length === 0) {
    return <div className="review-empty"><p>Read the latest guest feedback directly on our Google profile.</p><a className="text-link" href={GOOGLE_PROFILE_URL} target="_blank" rel="noreferrer">View Google reviews <span aria-hidden="true">→</span></a></div>
  }

  return <>
    <div className="review-grid">{reviews.map(review => {
      const relativeDate = review.relativePublishedAt || formatDate(review.publishedAt)
      const author = review.author || "Google Maps reviewer"
      const translated = Boolean(review.originalText && review.originalText.trim() !== review.text.trim())

      return <figure className="review-card" key={review.id}>
        <div className="review-stars" aria-label={review.rating + " out of 5 stars"}>{"★".repeat(review.rating)}</div>
        <blockquote>“{review.text}”</blockquote>
        {translated && <p className="review-date">Translated by Google Maps</p>}
        <figcaption>
          {review.authorPhotoUri && <img
            src={review.authorPhotoUri}
            alt=""
            width={40}
            height={40}
            style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
          />}
          {review.authorUri
            ? <a href={review.authorUri} target="_blank" rel="noreferrer"><strong>{author}</strong></a>
            : <strong>{author}</strong>}
          <span>{relativeDate}</span>
        </figcaption>
        <a className="review-source-link" href={review.googleMapsUri} target="_blank" rel="noreferrer">
          View this review on <span
            translate="no"
            style={{ fontFamily: "Roboto, Arial, sans-serif", fontWeight: 400, fontSize: 12, color: "#5e5e5e", whiteSpace: "nowrap" }}
          >Google Maps</span>
        </a>
      </figure>
    })}</div>
    <p className="review-status">
      Google returns up to five reviews in relevance order. Google does not verify every review, but checks for and removes fake content when identified.
    </p>
  </>
}
