import { Suspense } from "react"
import { QuoteForm } from "@/components/quote-form"
import { PageIntro } from "@/components/content"

export const metadata = { title: "Contact Phenom Tours | Book Your East Africa Safari", description: "Share your travel plans with our Uganda-based team. We’ll help plan the right East African safari for you.", alternates: { canonical: "/contact" } }

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ tour?: string; destination?: string }> }) {
  const { tour = "", destination = "" } = await searchParams
  return <main><PageIntro title="Contact Phenom Tours" description="Tell us about your travel plans. Our Uganda-based team will help you create a memorable East African safari." /><section className="content-section"><div className="container contact-grid"><aside className="contact-details"><span className="eyebrow">WE’RE HERE TO HELP</span><h2>Let’s plan your safari</h2><p>Share your preferred destinations, travel dates and the experiences that matter most to you. We’ll get back to you with a thoughtful starting point.</p><div className="contact-detail"><strong>Phone and WhatsApp</strong><a href="tel:+256764388326">+256 764 388 326</a><br /><a href="https://wa.me/256764388326">Chat on WhatsApp</a></div><div className="contact-detail"><strong>Email</strong><a href="mailto:info@phenomtoursandtravel.com">info@phenomtoursandtravel.com</a></div><div className="contact-detail"><strong>Based in</strong><span>Matugga, Uganda</span></div><p>Our team is available to help with permits, accommodation, local transfers and itinerary planning.</p></aside><div className="form-panel"><h2>Plan your East African safari</h2><p>Fields marked with * are required.</p><Suspense fallback={<p>Loading enquiry form…</p>}><QuoteForm initialTour={tour} initialDestination={destination} /></Suspense></div></div></section></main>
}
