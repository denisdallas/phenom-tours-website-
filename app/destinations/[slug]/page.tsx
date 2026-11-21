import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DestinationCard, PageIntro, TourGrid } from "@/components/content"
import { getDestinationSlug, getDestinations, getSanityImageUrl, getTours } from "@/lib/sanity"

export async function generateStaticParams() {
  const destinations = await getDestinations()
  return destinations.map(destination => ({ slug: getDestinationSlug(destination) }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const destination = (await getDestinations()).find(item => getDestinationSlug(item) === slug)
  if (!destination) return { title: "East Africa Destination" }
  const name = destination.country.trim()
  return {
    title: `${name} Safaris`,
    description: `Explore ${name} with Phenom Tours & Travel. Discover safari experiences and plan a trip around your dates, interests and preferred pace.`,
    alternates: { canonical: `/destinations/${encodeURIComponent(slug)}` },
    openGraph: { images: getSanityImageUrl(destination.featuredImage) ? [getSanityImageUrl(destination.featuredImage)!] : [] },
  }
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [destinations, tours] = await Promise.all([getDestinations(), getTours()])
  const destination = destinations.find(item => getDestinationSlug(item) === slug)
  if (!destination) notFound()

  const name = destination.country.trim()
  const relatedTours = tours.filter(tour => tour.country.trim().toLowerCase() === name.toLowerCase())
  const otherDestinations = destinations.filter(item => getDestinationSlug(item) !== slug)
  const image = getSanityImageUrl(destination.featuredImage, 1800)

  return (
    <main>
      <PageIntro eyebrow="EAST AFRICA" title={`${name} Safaris`} description={destination.description} />
      <section className="destination-detail content-section">
        <div className="container">
          {image && <img className="destination-detail-image" src={image} alt={destination.featuredImage?.alt || `${name} safari landscape`} />}
          <div className="destination-detail-copy">
            <span className="eyebrow">DISCOVER {name.toUpperCase()}</span>
            <h2>Travel deeper into {name}</h2>
            <p>{destination.description || `Plan a personal journey through ${name} with Phenom Tours & Travel.`}</p>
            <p>Our team can help shape your route, accommodation and activities around your travel dates, group size and interests.</p>
            <Link className="button button-orange" href={`/contact?destination=${encodeURIComponent(name)}`}>Plan a {name} safari</Link>
          </div>
        </div>
      </section>
      {relatedTours.length > 0 && <section className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">EXPLORE {name.toUpperCase()}</span><h2>{name} Tour Packages</h2><p>Start with one of these itineraries, then ask us to tailor it to your trip.</p></div><Link className="text-link" href={`/tour-packages?country=${encodeURIComponent(name)}`}>All {name} tours <span aria-hidden="true">→</span></Link></div><TourGrid tours={relatedTours} /></div></section>}
      {otherDestinations.length > 0 && <section className="content-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">MORE TO EXPLORE</span><h2>Other East Africa Destinations</h2></div></div><div className="destination-grid">{otherDestinations.map(item => <DestinationCard key={item._id} destination={item} />)}</div></div></section>}
    </main>
  )
}
