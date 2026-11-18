import { getGallery } from "@/lib/sanity"
import { GalleryGrid, PageIntro } from "@/components/content"

export const metadata = { title: "Safari Gallery | Phenom Tours & Travel", description: "Explore moments from safaris, landscapes and wildlife across East Africa.", alternates: { canonical: "/gallery" } }
export default async function GalleryPage() { const items = await getGallery(); return <main><PageIntro title="Safari Gallery" description="A glimpse of the people, wildlife and extraordinary landscapes you can experience with Phenom Tours & Travel." /><section className="content-section"><div className="container"><GalleryGrid items={items} /></div></section></main> }
