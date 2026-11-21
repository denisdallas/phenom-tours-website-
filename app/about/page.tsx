import Link from "next/link"
import { PageIntro } from "@/components/content"

export const metadata = {
  title: "About Our Uganda Safari Company",
  description: "Meet Phenom Tours, a Uganda-based team planning birding, primate, wildlife and community journeys across East Africa.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        title="A Uganda-Based Team for East Africa Safaris"
        description="Phenom Tours & Travel is a Uganda-based tour company planning wildlife, primate, birding and community journeys across East Africa. Tell us your dates and interests, and we’ll help shape a safari that fits."
      />
      <section className="content-section">
        <div className="container about-content">
          <section>
            <span className="eyebrow">OUR STORY</span>
            <h2>Locally planned journeys across East Africa</h2>
            <p>From our base in Uganda, we help travellers plan safaris across Uganda, Kenya, Rwanda and Tanzania. Start with the experiences that interest you, such as gorilla trekking, chimpanzee tracking, birding, wildlife viewing or community visits, and we can shape an itinerary around your travel dates, pace and comfort.</p>
            <p>We believe the best trips are shaped around the people taking them: their interests, group size, budget and curiosity. Our team works with local guides and partners to bring context to the places you visit, from forests and wetlands to savannah parks and lakeside communities.</p>
          </section>
          <section>
            <h2>How we plan your safari</h2>
            <h3>Start with your interests</h3>
            <p>Tell us what you want to see and how you like to travel. We tailor each safari to your dates, budget, preferred accommodation and the moments you hope to experience.</p>
            <h3>Coordinate the practical details</h3>
            <p>We help coordinate permits, accommodation, transfers and activities, and stay in touch as your trip takes shape.</p>
            <h3>Travel with local context</h3>
            <p>Our guides and local partners share context about the places you visit and the communities that make each journey meaningful.</p>
          </section>
          <section>
            <h2>Our promise</h2>
            <p>We aim to make every journey enriching for our guests and respectful of the communities, wildlife and landscapes that make East Africa so special.</p>
            <p>Explore our <Link className="text-link" href="/destinations">East African destinations</Link> or browse <Link className="text-link" href="/tour-packages">safari packages</Link> to find a starting point for your trip.</p>
            <Link className="button button-orange" href="/contact">Tell us about your safari</Link>
          </section>
        </div>
      </section>
    </main>
  )
}
