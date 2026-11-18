import { getDestinations } from "@/lib/sanity"
import { DestinationCard, PageIntro } from "@/components/content"

export const metadata = { title: "East Africa Destinations | Phenom Tours & Travel", description: "Explore Uganda, Kenya, Rwanda and Tanzania with a locally planned safari.", alternates: { canonical: "/destinations" } }
export default async function DestinationsPage() { const destinations = await getDestinations(); return <main><PageIntro title="Explore Our Destinations" description="Discover the best of East Africa through birding, primate, wildlife and community experiences in Uganda, Kenya, Rwanda and Tanzania." /><section className="content-section"><div className="container"><div className="destination-grid">{destinations.map(item => <DestinationCard key={item._id} destination={item} />)}</div></div></section></main> }
