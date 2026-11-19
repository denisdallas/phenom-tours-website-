import type { Metadata, Viewport } from "next"
import { SiteFooter, SiteHeader, WhatsAppButton } from "@/components/site-shell"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://phenomtoursandtravel.net"),
  title: { default: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", template: "%s | Phenom Tours & Travel" },
  description: "Discover Uganda with Phenom Tours and Travel through personalised birding, primate, wildlife and community safaris for budget, midrange and luxury travellers.",
  applicationName: "Phenom Tours & Travel",
  keywords: ["Uganda safari", "Uganda birding", "gorilla trekking Uganda", "East Africa tours", "Phenom Tours and Travel"],
  authors: [{ name: "Phenom Tours & Travel" }],
  creator: "Phenom Tours & Travel",
  publisher: "Phenom Tours & Travel",
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/logo.png", type: "image/png" }], shortcut: "/favicon.ico", apple: "/logo.png" },
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_UG", siteName: "Phenom Tours & Travel", title: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", description: "Personalised birding, primate, wildlife and community safaris across East Africa.", url: "https://phenomtoursandtravel.net" },
  twitter: { card: "summary_large_image", title: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", description: "Personalised birding, primate, wildlife and community safaris across East Africa." },
  other: { "msvalidate.01": "32B47117C014DEBB5B11A82D4BB69A0B" },
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#F97316", colorScheme: "light" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader />{children}<SiteFooter /><WhatsAppButton /></body></html>
}
