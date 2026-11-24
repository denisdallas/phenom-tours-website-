import type { AppProps } from "next/app"
import { SiteFooter, SiteHeader, WhatsAppButton } from "@/components/site-shell"
import "@/app/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <div id="main-content" tabIndex={-1}><Component {...pageProps} /></div>
      <SiteFooter />
      <WhatsAppButton />
    </>
  )
}
