import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageIntro, PortableBody, TourGrid } from "@/components/content"
import { getSanityImageUrl, getTours } from "@/lib/sanity"

export async function generateStaticParams() {
  const tours = await getTours({ requireAvailable: true })
  return tours.map(tour => ({ slug: tour.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tour = (await getTours({ requireAvailable: true })).find(item => item.slug === slug)
  if (!tour) return { title: "Safari Tour" }

  const image = getSanityImageUrl(tour.featuredImage)
  return {
    title: tour.seoTitle || tour.title.trim(),
    description: tour.seoDescription || tour.shortDescription,
    alternates: { canonical: `/tour-packages/${encodeURIComponent(slug)}` },
    openGraph: { images: image ? [image] : [] },
  }
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tours = await getTours({ requireAvailable: true })
  const tour = tours.find(item => item.slug === slug)
  if (!tour) notFound()

  const related = tours.filter(item => item.slug !== slug && item.country === tour.country).slice(0, 3)
  const image = getSanityImageUrl(tour.featuredImage, 1600)

  return (
    <main>
      <section className="tour-detail-hero">
        <div className="container tour-detail-layout">
          <div className="tour-detail-main">
            <span className="eyebrow">{tour.country} SAFARI · {tour.duration}</span>
            <h1>{tour.title.trim()}</h1>
            {tour.shortDescription && <p>{tour.shortDescription}</p>}
            <div className="tour-facts">
              <span>{tour.duration}</span>
              <span>{tour.country}</span>
              {tour.destination && <span>{tour.destination}</span>}
            </div>
            {image && <img src={image} alt={tour.featuredImage?.alt || tour.title.trim()} />}
          </div>
          <aside className="tour-aside">
            <span className="eyebrow">YOUR SAFARI STARTS HERE</span>
            {tour.price ? <><strong>{tour.priceDescription?.trim() || `USD ${tour.price.toLocaleString("en-US")} per person`}</strong><p>Request a written quote to confirm the rate for your dates and group size, room-sharing arrangements, and any single-room supplement.</p></> : <p>Tailor-made pricing for your travel dates and group size.</p>}
            <p>Contact us to check availability, permits and accommodation options.</p>
            <Link className="button button-orange" href={`/contact?tour=${encodeURIComponent(tour.title.trim())}`}>Request a quote</Link>
            <Link className="text-link" href="https://wa.me/256764388326" target="_blank" rel="noreferrer">WhatsApp our team</Link>
          </aside>
        </div>
      </section>

      <div className="container">
        <section className="detail-block"><h2>About this safari</h2><PortableBody value={tour.fullDescription} /></section>
        {tour.highlights?.length ? <section className="detail-block"><h2>Safari highlights</h2><ul>{tour.highlights.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section> : null}
        {tour.itinerary?.length ? <section className="detail-block"><h2>Day-by-day itinerary</h2>{tour.itinerary.map((item, index) => <article className="itinerary-item" key={`${index}-${item.title}`}>
          <h3>Day {item.dayNumber || index + 1}{item.title ? ` — ${item.title}` : ""}</h3>
          {item.description?.split("\n\n").map((paragraph, paragraphIndex) => <p key={`${paragraphIndex}-${paragraph}`}>{paragraph}</p>)}
          {item.activities?.length ? <ul>{item.activities.map((activity, activityIndex) => <li key={`${activityIndex}-${activity}`}>{activity}</li>)}</ul> : null}
          {(item.accommodation || item.meals) && <p className="itinerary-notes">{item.accommodation && <span><strong>Accommodation:</strong> {item.accommodation}</span>}{item.meals && <span><strong>Meals:</strong> {item.meals}</span>}</p>}
        </article>)}</section> : null}
        {(tour.inclusions?.length || tour.exclusions?.length) ? <section className="detail-block"><h2>What’s included</h2><div className="feature-grid">
          {tour.inclusions?.length ? <div><h3>Included</h3><ul>{tour.inclusions.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></div> : null}
          {tour.exclusions?.length ? <div><h3>Not included</h3><ul>{tour.exclusions.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></div> : null}
        </div></section> : null}
      </div>

      {related.length > 0 && <section className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">MORE TO EXPLORE</span><h2>More {tour.country} Safaris</h2></div></div><TourGrid tours={related} /></div></section>}
    </main>
  )
}
