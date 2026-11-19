import Link from "next/link"
import { PageIntro } from "@/components/content"
import { ServiceCards } from "@/components/service-cards"
import { getServices } from "@/lib/sanity"

export const metadata = {
  title: "East African Safari Services",
  description: "Explore safari planning and travel services from the Phenom Tours and Travel team in Uganda.",
  alternates: { canonical: "/services" },
}

export default async function ServicesPage() {
  const services = await getServices()
  return <main>
    <PageIntro title="Our Safari Services" description="From the first idea to the last transfer, we help you make the most of East Africa." />
    <section className="section section-green"><div className="container">
      <div className="section-heading section-heading-light"><div><h2>Explore Your Way</h2></div></div>
      <ServiceCards services={services} />
      <Link className="service-directory-link" href="/contact">Request a Quote</Link>
    </div></section>
  </main>
}
