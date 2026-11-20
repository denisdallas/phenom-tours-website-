import Link from "next/link"
import { getDestinations } from "@/lib/sanity"
import { DestinationCard, PageIntro } from "@/components/content"

export const metadata = {
  title: "East Africa Safari Destinations",
  description: "Explore Uganda, Kenya, Rwanda and Tanzania. Find wildlife, gorilla trekking, birding and East African safari destinations with Phenom Tours.",
  alternates: { canonical: "/destinations" },
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <main>
      <PageIntro
        title="Explore Our Destinations"
        description="Discover East Africa through birding, primate, wildlife and community experiences in Uganda, Kenya, Rwanda and Tanzania."
      />
      <section className="content-section">
        <div className="container">
          <h2>Choose your East African destination</h2>
          <div className="destination-grid">
            {destinations.map(item => <DestinationCard key={item._id} destination={item} />)}
          </div>
          <section className="detail-block">
            <h2>Discover East Africa your way</h2>
            <p>East Africa offers a variety of safari experiences, from forest encounters and birding to wildlife viewing across open savannahs and time with local communities. Choose a destination that matches what you want to experience, how long you have to travel and your preferred pace.</p>
            <p>Uganda is a rewarding choice for travellers interested in primates, birding, wildlife and varied landscapes. Kenya, Rwanda and Tanzania offer their own memorable wildlife, scenery and cultural experiences across the region.</p>
            <p>Not sure where to start? Browse our <Link className="text-link" href="/tour-packages">safari tour packages</Link> or <Link className="text-link" href="/contact">tell us what you would like to experience</Link>. We can help you plan a journey around your dates, interests and budget.</p>
          </section>
        </div>
      </section>
    </main>
  )
}
