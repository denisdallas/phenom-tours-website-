import type { Metadata, Viewport } from "next"
import Script from "next/script"
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
  openGraph: { type: "website", locale: "en_UG", siteName: "Phenom Tours & Travel", title: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", description: "Personalised birding, primate, wildlife and community safaris across East Africa." },
  twitter: { card: "summary_large_image", title: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", description: "Personalised birding, primate, wildlife and community safaris across East Africa." },
  other: { "msvalidate.01": "32B47117C014DEBB5B11A82D4BB69A0B" },
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#FC6105", colorScheme: "light" }

const analyticsId = "G-313EXGKDTC"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
        <WhatsAppButton />
        {process.env.NODE_ENV === "production" && <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
          <Script id="phenom-ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsId}');
          `}</Script>
        </>}
      </body>
    </html>
  )
}
