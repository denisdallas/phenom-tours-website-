import type { MetadataRoute } from "next"
import { getDestinationSlug, getDestinations, getPosts, getTours } from "@/lib/sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://phenomtoursandtravel.net"
  const [tours, posts, destinations] = await Promise.all([getTours(), getPosts(), getDestinations()])
  const staticRoutes = ["", "/about", "/contact", "/destinations", "/gallery", "/search", "/tour-packages", "/blog", "/privacy-policy", "/booking-terms-and-conditions"]
  return [
    ...staticRoutes.map(route => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...destinations.map(destination => ({ url: `${base}/destinations/${getDestinationSlug(destination)}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...tours.map(tour => ({ url: `${base}/tour-packages/${tour.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...posts.map(post => ({ url: `${base}/blog/${post.slug}`, lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
  ]
}
