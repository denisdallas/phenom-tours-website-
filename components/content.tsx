import Link from "next/link"
import { PortableText } from "@portabletext/react"
import type { Destination, Post, Tour } from "@/lib/sanity"
import { getDestinationSlug, getSanityImageUrl } from "@/lib/sanity"

export function PageIntro({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <section className="page-intro"><div className="container"><span className="eyebrow">{eyebrow || "PHENOM TOURS & TRAVEL"}</span><h1>{title}</h1>{description && <p>{description}</p>}</div></section>
}

export function TourCard({ tour }: { tour: Tour }) {
  return <article className="tour-card">
    <Link className="card-image" href={`/tour-packages/${tour.slug}`} aria-label={`View ${tour.title}`}>
      {getSanityImageUrl(tour.featuredImage) && <img src={getSanityImageUrl(tour.featuredImage)} alt={tour.featuredImage?.alt || tour.title} loading="lazy" />}
      {tour.price ? <span className="price-pill">USD {tour.price.toLocaleString()} per person</span> : null}
    </Link>
    <div className="card-body"><p className="card-meta">{tour.duration || "Tailor-made safari"} <span>·</span> {tour.country}</p>
      <h3><Link href={`/tour-packages/${tour.slug}`}>{tour.title.trim()}</Link></h3>
      <p>{tour.shortDescription}</p><Link className="text-link" href={`/tour-packages/${tour.slug}`}>View itinerary <span aria-hidden="true">→</span></Link>
    </div>
  </article>
}

export function TourGrid({ tours }: { tours: Tour[] }) {
  if (!tours.length) return <div className="empty-state">Tour packages are being updated. Please contact us for a tailor-made itinerary.</div>
  return <div className="tour-grid">{tours.map(tour => <TourCard key={tour._id} tour={tour} />)}</div>
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return <article className="destination-card">
    <Link className="card-image" href={`/destinations/${getDestinationSlug(destination)}`} aria-label={`Explore ${destination.country}`}>
      {getSanityImageUrl(destination.featuredImage) && <img src={getSanityImageUrl(destination.featuredImage)} alt={`${destination.country} safari landscape`} loading="lazy" />}
    </Link>
    <div className="destination-card-copy"><p className="eyebrow">EAST AFRICA</p><h3>{destination.country}</h3><p>{destination.description}</p><Link className="text-link" href={`/destinations/${getDestinationSlug(destination)}`}>Explore {destination.country} <span aria-hidden="true">→</span></Link></div>
  </article>
}

export function PostCard({ post }: { post: Post }) {
  return <article className="post-card">
    <Link className="card-image" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
      {getSanityImageUrl(post.featuredImage) && <img src={getSanityImageUrl(post.featuredImage)} alt={post.featuredImage?.alt || post.title} loading="lazy" />}
    </Link>
    <div className="card-body"><p className="card-meta">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "PHENOM TRAVEL JOURNAL"}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read article <span aria-hidden="true">→</span></Link></div>
  </article>
}

export function PortableBody({ value }: { value?: unknown[] }) {
  if (!value?.length) return null
  return <div className="portable-body"><PortableText value={value as never} components={{ block: { h1: ({ children }) => <h2>{children}</h2>, h2: ({ children }) => <h2>{children}</h2>, h3: ({ children }) => <h3>{children}</h3>, normal: ({ children }) => <p>{children}</p> }, list: { bullet: ({ children }) => <ul>{children}</ul>, number: ({ children }) => <ol>{children}</ol> }, marks: { link: ({ children, value }) => <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noreferrer" : undefined}>{children}</a> } }} /></div>
}
