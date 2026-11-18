import Link from "next/link"
import { getTours } from "@/lib/sanity"
import { PageIntro, TourGrid } from "@/components/content"

export const metadata = { title: "Safari Tour Packages | Uganda, Kenya, Rwanda & Tanzania", description: "Browse handcrafted East African safari packages and request a tailored itinerary.", alternates: { canonical: "/tour-packages" } }

export default async function TourPackagesPage({ searchParams }: { searchParams: Promise<{ country?: string }> }) {
  const [{ country }, tours] = await Promise.all([searchParams, getTours()])
  const filtered = country ? tours.filter(tour => tour.country?.trim().toLowerCase() === country.toLowerCase()) : tours
  return <main><PageIntro title="Our Tour Packages" description="Handcrafted East African safari and adventure packages for every traveler." /><section className="content-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">PERSONALISED EAST AFRICA SAFARIS</span><h2>Popular Tour Packages</h2><p>Expertly crafted packages ranging from quick getaways to comprehensive East African adventures.</p><p>Request group and travel-agent rates.</p></div><div className="hero-actions"><Link className="button button-orange" href="/contact">Inquire Now</Link><Link className="button button-outline" style={{ color: "var(--green)", borderColor: "var(--green)" }} href="https://wa.me/256764388326" target="_blank">WhatsApp Us</Link></div></div><TourGrid tours={filtered} /></div></section></main>
}
