"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const links = [
  ["Home", "/"],
  ["Destinations", "/destinations"],
  ["Packages", "/tour-packages"],
  ["Services", "/#services"],
  ["Gallery", "/gallery"],
  ["Search Tour", "/search"],
  ["Blog", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Phenom Tours & Travel home" onClick={() => setOpen(false)}>
        <img src="https://phenomtoursandtravel.net/logo.png" alt="Phenom Tours & Travel" width={242} height={65} />
      </Link>
      <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
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
          <img src="https://phenomtoursandtravel.net/logo.png" alt="Phenom Tours & Travel" width={220} height={60} />
          <p>Thoughtfully planned birding, primate, wildlife and community safaris across East Africa.</p>
        </div>
        <div><h2>Explore</h2><Link href="/destinations">Destinations</Link><Link href="/tour-packages">Tour packages</Link><Link href="/gallery">Gallery</Link><Link href="/search">Search tours</Link></div>
        <div><h2>Company</h2><Link href="/about">About us</Link><Link href="/blog">Travel journal</Link><Link href="/contact">Contact</Link><Link href="/booking-terms-and-conditions">Booking terms</Link><Link href="/privacy-policy">Privacy policy</Link></div>
        <div><h2>Get in touch</h2><a href="tel:+256764388326">+256 764 388 326</a><a href="mailto:info@phenomtoursandtravel.com">info@phenomtoursandtravel.com</a><a href="https://wa.me/256764388326" target="_blank" rel="noreferrer">WhatsApp us</a><p>Entebbe, Uganda</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Phenom Tours and Travel Co Ltd</span><span>Uganda · Kenya · Rwanda · Tanzania</span></div>
    </footer>
  )
}

export function WhatsAppButton() {
  return <a className="whatsapp-float" href="https://wa.me/256764388326" target="_blank" rel="noreferrer" aria-label="Chat with Phenom Tours on WhatsApp">◉</a>
}
