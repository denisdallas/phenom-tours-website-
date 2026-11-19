import type { MetadataRoute } from "next"
import { getDestinationSlug, getDestinations, getPosts, getTours } from "@/lib/sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://phenomtoursandtravel.net"
  const [tours, posts, destinations] = await Promise.all([getTours(), getPosts(), getDestinations()])
  const staticRoutes = ["", "/about", "/contact", "/destinations", "/gallery", "/services", "/search", "/tour-packages", "/blog", "/privacy-policy", "/booking-terms-and-conditions"]
  return [
    ...staticRoutes.map(route => ({ url: `${base}${route}`, changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...destinations.map(destination => ({ url: `${base}/destinations/${encodeURIComponent(getDestinationSlug(destination))}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...tours.map(tour => ({ url: `${base}/tour-packages/${encodeURIComponent(tour.slug)}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...posts.map(post => ({ url: `${base}/blog/${encodeURIComponent(post.slug)}`, lastModified: post.publishedAt || undefined, changeFrequency: "monthly" as const, priority: 0.6 })),
  ]
}
