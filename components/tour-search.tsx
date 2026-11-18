"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { Tour } from "@/lib/sanity"

export function TourSearch({ tours }: { tours: Tour[] }) {
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("All countries")
  const countries = ["All countries", "Tanzania", "Rwanda", "Kenya", "Uganda"]
  const filtered = useMemo(() => tours.filter(tour => {
    const matchesCountry = country === "All countries" || tour.country?.trim().toLowerCase() === country.toLowerCase()
    const term = search.trim().toLowerCase()
    const matchesText = !term || `${tour.title} ${tour.country} ${tour.destination} ${tour.shortDescription}`.toLowerCase().includes(term)
    return matchesCountry && matchesText
  }), [tours, search, country])
  return <div className="search-layout">
    <div className="search-controls"><label>Search tours<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Title, country, or destination" /></label><label>Filter by country<select value={country} onChange={event => setCountry(event.target.value)}>{countries.map(item => <option key={item}>{item}</option>)}</select></label></div>
    <p className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "tour" : "tours"} found</p>
    <div className="search-results">{filtered.map(tour => <article className="search-result" key={tour._id}><p className="eyebrow">{tour.country}</p><h2>{tour.title.trim()}</h2><p>{tour.shortDescription}</p><div className="search-result-footer"><span>{tour.duration}</span><Link className="text-link" href={`/tour-packages/${tour.slug}`}>View tour <span aria-hidden="true">→</span></Link></div></article>)}</div>
    {!filtered.length && <div className="empty-state">No tours match your search. Try another destination or contact us for a custom itinerary.</div>}
  </div>
}
