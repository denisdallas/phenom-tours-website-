import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { GOOGLE_PROFILE_URL, TRIPADVISOR_LISTING_URL } from "@/lib/review-links"

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
      <p>Tripadvisor keeps its latest traveller reviews on its listing. Open Tripadvisor to read the current reviews and ratings.</p>
      <a className="text-link" href={TRIPADVISOR_LISTING_URL} target="_blank" rel="noreferrer">Read reviews on Tripadvisor <ArrowRight size={16} /></a>
    </div></section>
    <section className="section section-white"><div className="container">
      <div className="review-empty">
        <p>Google reviews update automatically on our homepage.</p>
        <Link className="text-link" href="/#reviews">View Google reviews <ArrowRight size={16} /></Link>
      </div>
      <div className="review-platform-link"><Link className="text-link" href="/">Back to Phenom Tours <ArrowRight size={16} /></Link><a className="text-link" href={GOOGLE_PROFILE_URL} target="_blank" rel="noreferrer">Open Google profile <ArrowRight size={16} /></a></div>
    </div></section>
  </main>
}
