import { getTours } from "@/lib/sanity"
import { PageIntro } from "@/components/content"
import { TourSearch } from "@/components/tour-search"

export const metadata = { title: "Search Tours | Phenom Tours & Travel", description: "Find a published East African tour by title, country, or destination.", alternates: { canonical: "/search" } }
export default async function SearchPage() { const tours = await getTours(); return <main><PageIntro title="Search Tours" description="Find a published East African tour by title, country, or destination." /><section className="content-section"><div className="container"><TourSearch tours={tours} /></div></section></main> }
