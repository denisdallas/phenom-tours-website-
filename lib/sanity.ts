import { createClient } from "@sanity/client"

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r5l7hs53",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  perspective: "published",
})

export type ImageAsset = { url?: string; alt?: string }
export type Tour = {
  _id: string
  title: string
  slug: string
  country: string
  destination?: string
  duration?: string
  price?: number
  priceDescription?: string
  shortDescription?: string
  fullDescription?: unknown[]
  highlights?: string[]
  inclusions?: string[]
  exclusions?: string[]
  itinerary?: Array<{ dayNumber?: number; title?: string; description?: string; activities?: string[]; accommodation?: string; meals?: string }>
  featuredImage?: ImageAsset
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
}
export type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  publishedAt?: string
  body?: unknown[]
  featuredImage?: ImageAsset
  author?: { name?: string }
  seoTitle?: string
  seoDescription?: string
}
export type Destination = {
  _id: string
  name: string
  country: string
  description?: string
  featuredImage?: ImageAsset
  slug?: string
}
export type GalleryItem = { _id: string; title: string; country?: string; image?: ImageAsset }
export type Service = { _id: string; title: string; description?: string; icon?: string }
export type Testimonial = { _id: string; customerName?: string; text?: string; rating?: number; location?: string }
export type SiteSettings = {
  siteTitle?: string
  siteDescription?: string
  seoTitle?: string
  seoDescription?: string
  heroBackgroundMode?: string
  heroBackgroundVideo?: { asset?: { url?: string } }
  heroVideoPoster?: ImageAsset
  heroBackgroundImage?: ImageAsset
  phone?: string
  contactEmail?: string
  location?: string
  about?: string
}

async function query<T>(groq: string): Promise<T> {
  return sanity.fetch<T>(groq, {}, { next: { revalidate: 60, tags: ["sanity-content"] } })
}

export async function getTours(): Promise<Tour[]> {
  try {
    return await query<Tour[]>(`*[_type == "tour" && published == true && defined(slug.current)] | order(featured desc, _createdAt desc) {
      _id, title, "slug": slug.current, country, destination, duration, price, priceDescription,
      shortDescription, fullDescription, highlights, inclusions, exclusions, itinerary,
      featured, seoTitle, seoDescription, "featuredImage": {"url": featuredImage.asset->url, "alt": title}
    }`)
  } catch {
    return []
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    return await query<Post[]>(`*[_type == "post" && published != false && defined(slug.current)] | order(publishedAt desc) {
      _id, title, "slug": slug.current, excerpt, category, publishedAt, body,
      seoTitle, seoDescription, "featuredImage": {"url": featuredImage.asset->url, "alt": title}, "author": author->{name}
    }`)
  } catch {
    return []
  }
}

export async function getDestinations(): Promise<Destination[]> {
  try {
    return await query<Destination[]>(`*[_type == "destination" && published != false] | order(country asc) {
      _id, name, country, description, "slug": slug.current, "featuredImage": {"url": featuredImage.asset->url, "alt": name}
    }`)
  } catch {
    return []
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  try {
    return await query<GalleryItem[]>(`*[_type == "galleryItem"] | order(_createdAt desc) {
      _id, title, country, "image": {"url": image.asset->url, "alt": title}
    }`)
  } catch {
    return []
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    return await query<Service[]>(`*[_type == "service" && published != false] | order(_createdAt asc) {_id, title, description, icon}`)
  } catch {
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await query<Testimonial[]>(`*[_type == "testimonial" && published == true] | order(_createdAt desc) {_id, customerName, text, rating, location}`)
  } catch {
    return []
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await query<SiteSettings | null>(`*[_type == "siteSettings"][0]{
      siteTitle, siteDescription, seoTitle, seoDescription, heroBackgroundMode,
      "heroBackgroundVideo": {"asset": {"url": heroBackgroundVideo.asset->url}},
      "heroVideoPoster": {"url": heroVideoPoster.asset->url, "alt": "Uganda safari"},
      "heroBackgroundImage": {"url": heroBackgroundImage.asset->url, "alt": "Uganda safari"},
      phone, contactEmail, location, about
    }`)
  } catch {
    return null
  }
}

export function getDestinationSlug(destination: Destination) {
  return destination.slug?.trim() || destination.country.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function getSanityImageUrl(image?: ImageAsset, width = 1200) {
  if (!image?.url) return undefined
  return `${image.url}?w=${width}&auto=format`
}
