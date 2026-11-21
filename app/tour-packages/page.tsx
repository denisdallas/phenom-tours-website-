import Link from "next/link"
import { getTours } from "@/lib/sanity"
import { PageIntro, TourGrid } from "@/components/content"

export const metadata = { title: "East Africa Safari Packages", description: "Browse Uganda, Kenya, Rwanda and Tanzania safari packages. Compare wildlife, birding and primate itineraries, then ask Phenom to tailor a trip to your plans.", alternates: { canonical: "/tour-packages" } }

function singleValue(value: string | string[] | undefined) {
  return (typeof value === "string" ? value : value?.[0] ?? "").trim()
}

export default async function TourPackagesPage({ searchParams }: {
  searchParams: Promise<{ country?: string | string[]; q?: string | string[] }>
}) {
  const [params, tours] = await Promise.all([searchParams, getTours()])
  const country = singleValue(params.country).toLowerCase()
  const query = singleValue(params.q).slice(0, 100)
  const term = query.toLowerCase()
  const countryNames = new Map<string, string>()
  for (const tour of tours) {
    const name = tour.country?.trim()
    if (name) countryNames.set(name.toLowerCase(), name)
  }
  const countries = Array.from(countryNames).sort(([, a], [, b]) => a.localeCompare(b))
  const filtered = tours.filter(tour =>
    (!country || tour.country?.trim().toLowerCase() === country) &&
    (!term || [tour.title, tour.country, tour.destination, tour.shortDescription].some(value => value?.toLowerCase().includes(term)))
  )

  return <main>
    <PageIntro title="Explore Safari Tour Packages" description="Compare East Africa itineraries for wildlife, birding and primate experiences. Choose a starting tour, then ask us to tailor it around your dates and interests." />
    <section className="content-section"><div className="container">
      <div className="section-heading">
        <div><span className="eyebrow">PERSONALISED EAST AFRICA SAFARIS</span><h2>Find a safari that fits your plans</h2><p>Search by tour name or destination, or filter by country. Each itinerary is a starting point; ask us to tailor the route, activities and accommodation to your dates, group and budget.</p><p>Travelling as a group or booking as an agent? Ask us for rates.</p></div>
        <div className="hero-actions"><Link className="button button-orange" href="/contact">Request a tailor-made quote</Link><Link className="button button-outline" style={{ color: "var(--green)", borderColor: "var(--green)" }} href="https://wa.me/256764388326" target="_blank" rel="noreferrer">WhatsApp Us</Link></div>
      </div>
      <form className="tour-filters" action="/tour-packages" method="get" aria-label="Filter tours">
        <div className="search-controls">
          <label>Search tours<input name="q" type="search" maxLength={100} defaultValue={query} placeholder="Title, country, or destination" /></label>
          <label>Country<select name="country" defaultValue={country}>
            <option value="">All countries</option>
            {country && !countryNames.has(country) && <option value={country}>{country}</option>}
            {countries.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select></label>
        </div>
        <div className="filter-actions"><button type="submit" className="button button-orange">Apply filters</button>{(country || query) && <Link className="text-link" href="/tour-packages">Clear filters</Link>}</div>
      </form>
      <p className="result-count">{filtered.length} {filtered.length === 1 ? "tour" : "tours"} found</p>
      {tours.length > 0 && filtered.length === 0
        ? <p className="empty-state">No tours match these filters. Try another search or <Link className="text-link" href="/contact">ask for a custom itinerary</Link>.</p>
        : <TourGrid tours={filtered} />}
    </div></section>
  </main>
}
