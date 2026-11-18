import type { MetadataRoute } from "next"
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://phenomtoursandtravel.net/sitemap.xml", host: "https://phenomtoursandtravel.net" } }
