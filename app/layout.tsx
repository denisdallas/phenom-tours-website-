import { siteMetadata, siteViewport } from "@/lib/site-metadata"
import { TrackingHead, TagManagerFallback } from "@/components/tracking"
import { SiteFooter, SiteHeader, WhatsAppButton } from "@/components/site-shell"
import "./globals.css"

export const metadata = siteMetadata
export const viewport = siteViewport

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <TrackingHead />
      </head>
      <body>
        <TagManagerFallback />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  )
}
