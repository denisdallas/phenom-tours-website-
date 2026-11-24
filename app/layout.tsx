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
  openGraph: { type: "website", locale: "en_UG", siteName: "Phenom Tours & Travel", title: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", description: "Personalised birding, primate, wildlife and community safaris across East Africa." },
  twitter: { card: "summary_large_image", title: "Phenom Tours and Travel | Uganda Birding & Primate Safaris", description: "Personalised birding, primate, wildlife and community safaris across East Africa." },
  other: { "msvalidate.01": "32B47117C014DEBB5B11A82D4BB69A0B" },
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#FC6105", colorScheme: "light" }

const tagManagerId = "GTM-KVK8CGDV"
const analyticsId = "G-313EXGKDTC"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "production" && <>
          <script id="phenom-gtm" dangerouslySetInnerHTML={{ __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${tagManagerId}');
          ` }} />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} />
          <script id="phenom-ga4" dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsId}');
          ` }} />
        </>}
      </head>
      <body>
        {process.env.NODE_ENV === "production" && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${tagManagerId}`}
              title="Google Tag Manager"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  )
}
