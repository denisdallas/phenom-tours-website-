import { Binoculars, Compass, HeartHandshake, Leaf, MapPinned, PawPrint, ShieldCheck } from "lucide-react"
import type { Service } from "@/lib/sanity"

export const specialties = [
  { icon: Binoculars, title: "Birding Adventures", body: "Explore Uganda’s wetlands, forests and savannah in search of remarkable birdlife, from shoebills at Mabamba to forest and open-country species." },
  { icon: PawPrint, title: "Primate Encounters", body: "Meet mountain gorillas in Bwindi and track chimpanzees in Kibale with practical planning and permits subject to availability." },
  { icon: Compass, title: "Wildlife Experiences", body: "Discover national parks through guided game drives, scenic boat excursions and time in East Africa’s remarkable landscapes." },
  { icon: HeartHandshake, title: "Community Connections", body: "Meet local hosts, learn about traditions and everyday life, and discover the stories connected to the places you explore." },
]

export function ServiceCards({ services }: { services: Service[] }) {
  const cards = services.length ? services : specialties.map(item => ({
    _id: item.title, title: item.title, description: item.body,
  }))
  const icons = [Binoculars, Leaf, ShieldCheck, MapPinned]

  return <div className="service-grid">{cards.map((service, index) => {
    const Icon = icons[index % icons.length]
    return <article className="service-card" key={service._id}>
      <Icon size={28} aria-hidden="true" />
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </article>
  })}</div>
}
