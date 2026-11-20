import Link from "next/link"
import { getDestinations } from "@/lib/sanity"
import { DestinationCard, PageIntro } from "@/components/content"

export const metadata = {
  title: "East Africa Safari Destinations",
  description: "Compare Uganda, Kenya, Rwanda and Tanzania safari destinations. Explore wildlife, birding and primate experiences, then plan your East Africa trip.",
  alternates: { canonical: "/destinations" },
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <main>
      <PageIntro
        title="Explore East Africa Safari Destinations"
        description="Choose from Uganda, Kenya, Rwanda and Tanzania. Compare each destination's safari experiences, browse tour options and plan around your dates and interests."
      />
      <section className="content-section">
        <div className="container">
          <h2>Compare our destinations</h2>
          <div className="destination-grid">
            {destinations.map(item => <DestinationCard key={item._id} destination={item} />)}
          </div>
          <section className="detail-block">
            <h2>Plan an East Africa safari that fits your trip</h2>
            <p>East Africa offers varied ways to travel, from forest encounters and birding to wildlife viewing across open savannahs and time with local communities. Think about the experiences you want, your travel dates and how much time you have when choosing where to go.</p>
            <p>Not sure where to start? Browse our <Link className="text-link" href="/tour-packages">safari tour packages</Link> or <Link className="text-link" href="/contact">tell us what you would like to experience</Link>. We can help shape a journey around your dates, interests and budget.</p>
          </section>
        </div>
      </section>
    </main>
  )
}
