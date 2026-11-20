import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { TripadvisorReviewFeed } from "@/components/tripadvisor-review-feed"
import { TRIPADVISOR_LISTING_URL } from "@/lib/review-links"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Tripadvisor traveller reviews | Phenom Tours & Travel",
  robots: {
    index: false,
    follow: false,
  },
}

export default function TripadvisorReviewsPage() {
  return <main>
    <section className="page-intro"><div className="container">
      <span className="eyebrow">TRIPADVISOR TRAVELLER REVIEWS</span>
      <h1>Guest feedback on Tripadvisor</h1>
      <p>Read traveller reviews from Phenom Tours’ Tripadvisor listing.</p>
      <a className="text-link" href={TRIPADVISOR_LISTING_URL} target="_blank" rel="noreferrer">View all reviews on Tripadvisor <ArrowRight size={16} /></a>
    </div></section>
    <section className="section section-white"><div className="container">
      <TripadvisorReviewFeed />
      <div className="review-platform-link"><Link className="text-link" href="/">Back to Phenom Tours <ArrowRight size={16} /></Link></div>
    </div></section>
  </main>
}
