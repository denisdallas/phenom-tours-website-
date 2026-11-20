import Link from "next/link"
import { PageIntro } from "@/components/content"

export const metadata = {
  title: "About Our Uganda Safari Team",
  description: "Meet Phenom Tours, a Uganda-based team planning personal birding, primate, wildlife and community safaris across East Africa.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        title="About Phenom Tours & Travel"
        description="We create authentic East African experiences with thoughtful planning, local knowledge, and a focus on meaningful travel."
      />
      <section className="content-section">
        <div className="container about-content">
          <section>
            <span className="eyebrow">OUR STORY</span>
            <h2>Travel with a deeper connection</h2>
            <p>Phenom Tours &amp; Travel is a Uganda-based tour company creating memorable journeys across East Africa. We believe the best trips are shaped around the people taking them: their interests, pace, comfort and curiosity.</p>
            <p>From mountain gorilla trekking and chimpanzee tracking to birding, wildlife viewing and community experiences, we help travellers explore the region with local insight and practical planning.</p>
          </section>
          <section>
            <h2>What makes a Phenom journey different?</h2>
            <h3>Local knowledge, thoughtfully shared</h3>
            <p>Our guides and local partners bring context to the places you visit, from forests and wetlands to savannah parks and lakeside communities.</p>
            <h3>Made for your interests</h3>
            <p>Tell us what you want to see and how you like to travel. We tailor each safari to your dates, budget, preferred accommodation and the moments you hope to experience.</p>
            <h3>Care in every detail</h3>
            <p>We help coordinate permits, accommodation, transfers and activities, and stay in touch as your trip takes shape.</p>
          </section>
          <section>
            <h2>Our promise</h2>
            <p>We aim to make every journey enriching for our guests and respectful of the communities, wildlife and landscapes that make East Africa so special.</p>
            <p>Explore our <Link className="text-link" href="/destinations">East African destinations</Link> or browse <Link className="text-link" href="/tour-packages">safari packages</Link> to find a starting point for your trip.</p>
            <Link className="button button-orange" href="/contact">Plan your safari</Link>
          </section>
        </div>
      </section>
    </main>
  )
}
