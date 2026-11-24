import type { Metadata, Viewport } from "next"

export const siteMetadata = {
  metadataBase: new URL("https://phenomtoursandtravel.net"),
  title: { default: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", template: "%s | Phenom Tours & Travel" },
  description: "Discover Uganda with Phenom Tours and Travel through personalised birding, primate, wildlife and community safaris for budget, midrange and luxury travellers.",
  applicationName: "Phenom Tours & Travel",
  keywords: ["Uganda safari", "Uganda birding", "gorilla trekking Uganda", "East Africa tours", "Phenom Tours and Travel"],
  authors: [{ name: "Phenom Tours & Travel" }],
  creator: "Phenom Tours & Travel",
  publisher: "Phenom Tours & Travel",
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/logo.png", type: "image/png" }], shortcut: "/favicon.ico", apple: "/logo.png" },
  openGraph: { type: "website", locale: "en_UG", siteName: "Phenom Tours & Travel", title: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", description: "Personalised birding, primate, wildlife and community safaris across East Africa." },
  twitter: { card: "summary_large_image", title: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", description: "Personalised birding, primate, wildlife and community safaris across East Africa." },
  other: { "msvalidate.01": "32B47117C014DEBB5B11A82D4BB69A0B" },
} satisfies Metadata

export const siteViewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#FC6105", colorScheme: "light" } satisfies Viewport
