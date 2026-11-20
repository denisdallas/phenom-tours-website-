"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, MessageCircle, X, Instagram, Facebook } from "lucide-react"

const links = [
  ["Home", "/"],
  ["Destinations", "/destinations"],
  ["Packages", "/tour-packages"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["Search Tour", "/search"],
  ["Blog", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header" onKeyDown={event => {
      if (event.key === "Escape" && open) {
        setOpen(false)
        event.currentTarget.querySelector<HTMLButtonElement>(".menu-toggle")?.focus()
      }
    }}>
      <Link href="/" className="brand" aria-label="Phenom Tours & Travel home" onClick={() => setOpen(false)}>
        <img src="/logo.png" alt="Phenom Tours & Travel" width={242} height={65} />
      </Link>
      <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav id="main-navigation" className={`main-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo.png" alt="Phenom Tours & Travel" width={220} height={60} />
          <p>Thoughtfully planned birding, primate, wildlife and community safaris across East Africa.</p>
        </div>
        <div><h2>Explore</h2><Link href="/destinations">Destinations</Link><Link href="/tour-packages">Tour packages</Link><Link href="/gallery">Gallery</Link><Link href="/search">Search tours</Link></div>
        <div><h2>Company</h2><Link href="/about">About us</Link><Link href="/blog">Travel journal</Link><Link href="/contact">Contact</Link><Link href="/booking-terms-and-conditions">Booking terms</Link><Link href="/privacy-policy">Privacy policy</Link></div>
        <div><h2>Get in touch</h2><a href="tel:+256764388326">+256 764 388 326</a><a href="mailto:info@phenomtoursandtravel.com">info@phenomtoursandtravel.com</a><a href="https://wa.me/256764388326" target="_blank" rel="noreferrer">WhatsApp us</a><p>Matugga, Uganda</p>
          <div className="footer-social" aria-label="Social media">
            <a href="https://www.instagram.com/phenomtours?igsh=b3o2cGEzdzdkeXo5" target="_blank" rel="noreferrer" aria-label="Follow Phenom Tours on Instagram"><Instagram size={20} aria-hidden="true" /><span>Instagram</span></a>
            <a href="https://www.facebook.com/share/18mCZoTWKx/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Follow Phenom Tours on Facebook"><Facebook size={20} aria-hidden="true" /><span>Facebook</span></a>
          </div></div>
      </div>
      <div className="trust-badges" aria-label="Tourism recognition and accepted payments">
        <section className="trust-row" aria-labelledby="recognized-by-title">
          <h2 id="recognized-by-title" className="trust-title">Licensed &amp; Recognized By</h2>
          <div className="trust-logo-list trust-logo-list-recognition">
            <span className="trust-logo-card"><img src="/badges/uwa.png" alt="Uganda Wildlife Authority" width={250} height={394} loading="lazy" decoding="async" /></span>
            <span className="trust-logo-card"><img src="/badges/utb.png" alt="Uganda Tourism Board" width={400} height={400} loading="lazy" decoding="async" /></span>
            <span className="trust-logo-card"><img src="/badges/tripadvisor.png" alt="Tripadvisor" width={550} height={350} loading="lazy" decoding="async" /></span>
          </div>
        </section>
        <div className="trust-divider" aria-hidden="true" />
        <section className="trust-row" aria-labelledby="payments-title">
          <h2 id="payments-title" className="trust-title">Secure Payments Accepted</h2>
          <div className="trust-logo-list trust-logo-list-payments">
            <img className="trust-payment-logo" src="/badges/visa.png" alt="Visa" width={600} height={400} loading="lazy" decoding="async" />
            <img className="trust-payment-logo" src="/badges/mastercard.png" alt="Mastercard" width={735} height={415} loading="lazy" decoding="async" />
            <img className="trust-payment-logo" src="/badges/amex.png" alt="American Express" width={736} height={736} loading="lazy" decoding="async" />
            <img className="trust-payment-logo" src="/badges/paypal.png" alt="PayPal" width={736} height={736} loading="lazy" decoding="async" />
            <img className="trust-payment-logo" src="/badges/discover.png" alt="Discover" width={736} height={736} loading="lazy" decoding="async" />
          </div>
        </section>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Phenom Tours and Travel Co Ltd</span><span>Uganda · Kenya · Rwanda · Tanzania</span></div>
    </footer>
  )
}

export function WhatsAppButton() {
  return <a className="whatsapp-float" href="https://wa.me/256764388326" target="_blank" rel="noreferrer" aria-label="Chat with Phenom Tours on WhatsApp"><MessageCircle size={23} aria-hidden="true" /></a>
}
