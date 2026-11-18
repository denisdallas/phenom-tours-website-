import Link from "next/link"
import { ArrowRight, Binoculars, Compass, HeartHandshake, Leaf, MapPinned, PawPrint, ShieldCheck } from "lucide-react"
import { getDestinations, getPosts, getServices, getSiteSettings, getTestimonials, getTours, getSanityImageUrl } from "@/lib/sanity"
import { DestinationCard, PostCard, TourGrid } from "@/components/content"

export const metadata = {
  title: "Phenom Tours and Travel | Uganda Birding & Primate Safaris",
  description: "Explore Uganda through personalised birding, primate trekking, wildlife and community safaris. Choose budget, mid-range or luxury journeys tailored to your interests, travel dates and preferred pace.",
  alternates: { canonical: "/" },
}

const specialties = [
  { icon: Binoculars, title: "Birding Adventures", body: "Explore Uganda’s wetlands, forests and savannah in search of remarkable birdlife, from shoebills at Mabamba to forest and open-country species." },
  { icon: PawPrint, title: "Primate Encounters", body: "Meet mountain gorillas in Bwindi and track chimpanzees in Kibale with practical planning and permits subject to availability." },
  { icon: Compass, title: "Wildlife Experiences", body: "Discover national parks through guided game drives, scenic boat excursions and time in East Africa’s remarkable landscapes." },
  { icon: HeartHandshake, title: "Community Connections", body: "Meet local hosts, learn about traditions and everyday life, and discover the stories connected to the places you explore." },
]

export default async function HomePage() {
  const [settings, tours, destinations, services, posts, testimonials] = await Promise.all([getSiteSettings(), getTours(), getDestinations(), getServices(), getPosts(), getTestimonials()])
  const video = settings?.heroBackgroundVideo?.asset?.url || "https://cdn.sanity.io/files/r5l7hs53/production/775ad414da4903fb27d3bc4bedac81aa69c86229.mp4"
  const poster = getSanityImageUrl(settings?.heroVideoPoster, 1800) || "https://cdn.sanity.io/images/r5l7hs53/production/ac13834cb28ff40ed6c34db8d5015ae073e474e9-1080x1080.jpg"
  const featuredTours = tours.filter(tour => tour.featured).slice(0, 6)
  const selectedTours = featuredTours.length ? featuredTours : tours.slice(0, 6)
  const serviceCards = services.length ? services.map(item => ({ _id: item._id, title: item.title, description: item.description })) : specialties.map(item => ({ _id: item.title, title: item.title, description: item.body }))
  return <main>
    <section className="hero" aria-label="Uganda safari experiences">
      <video className="hero-media" autoPlay muted loop playsInline poster={poster} aria-label="Zebra and savannah landscape video"><source src={video} type="video/mp4" /></video>
      <div className="hero-shade" />
      <div className="hero-content"><span className="hero-kicker">UGANDA · KENYA · RWANDA · TANZANIA</span>
        <h1>Uganda Birding, Primate, Wildlife &amp; Community Safaris</h1>
        <p>Explore Uganda through personalised birding, primate trekking, wildlife and community safaris. Choose budget, mid-range or luxury journeys tailored to your interests, travel dates and preferred pace.</p>
        <div className="hero-actions"><Link className="button button-orange" href="/contact">Book Now</Link><Link className="button button-outline" href="/#destinations">Explore Destinations</Link></div>
      </div><a className="hero-scroll" href="#why-phenom" aria-label="Scroll to discover">↓</a>
    </section>

    <section id="why-phenom" className="section section-white"><div className="container why-layout"><div className="why-copy"><span className="eyebrow">A JOURNEY THAT FEELS LIKE YOURS</span><h2>Why Choose Phenom Tours &amp; Travel?</h2><p>We create authentic East African experiences with thoughtful planning, local knowledge, and a focus on meaningful travel.</p><p>Our team of expert guides, local partnerships, and personalized service ensure every moment of your journey is extraordinary. From mountain gorilla trekking to wildlife safaris, we handle every detail with care.</p><Link className="text-link" href="/about">Discover our story <ArrowRight size={16} /></Link></div>
      <div className="feature-grid">{specialties.map(({ icon: Icon, title, body }) => <article className="feature" key={title}><span className="feature-icon"><Icon size={23} /></span><h3>{title}</h3><p>{body}</p></article>)}</div></div>
      <div className="container stats-row"><div><strong>4</strong><span>Countries to explore</span></div><div><strong>41+</strong><span>Thoughtfully planned tours</span></div><div><strong>Personal</strong><span>Local expertise</span></div><div><strong>Tailored</strong><span>Flexible planning</span></div></div>
    </section>

    <section id="destinations" className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">EXPLORE EAST AFRICA</span><h2>Explore Our Destinations</h2><p>Discover the best of East Africa with expertly curated tours across Uganda, Kenya, Rwanda, and Tanzania.</p></div><Link className="text-link" href="/destinations">All destinations <ArrowRight size={16} /></Link></div>
      <div className="destination-grid">{destinations.map(destination => <DestinationCard key={destination._id} destination={destination} />)}</div></div></section>

    <section className="section section-white"><div className="container"><div className="section-heading"><div><span className="eyebrow">TRAVEL YOUR WAY</span><h2>Featured Safari Packages</h2><p>Choose a starting point, then let us shape the details around your travel style.</p></div><Link className="text-link" href="/tour-packages">View all packages <ArrowRight size={16} /></Link></div><TourGrid tours={selectedTours} /></div></section>

    <section className="section section-green" id="services"><div className="container"><div className="section-heading section-heading-light"><div><span className="eyebrow">PERSONAL SERVICE, THOUGHTFUL DETAIL</span><h2>Explore Your Way</h2><p>From the first idea to the last transfer, we help you make the most of East Africa.</p></div></div><div className="service-grid">{serviceCards.map((service, index) => { const icons = [Binoculars, Leaf, ShieldCheck, MapPinned]; const Icon = icons[index % icons.length]; return <article className="service-card" key={service._id}><Icon size={28} /><h3>{service.title}</h3><p>{service.description}</p></article> })}</div></div></section>

    {testimonials.length > 0 && <section className="section section-white"><div className="container"><div className="section-heading"><div><span className="eyebrow">TRAVELLER STORIES</span><h2>What Our Guests Say</h2><p>Personal journeys, remembered long after the return home.</p></div></div><div className="testimonial-grid">{testimonials.slice(0, 3).map(testimonial => <figure className="testimonial-card" key={testimonial._id}><div className="testimonial-stars" aria-label={`${testimonial.rating || 5} out of 5 stars`}>{"★".repeat(Math.min(testimonial.rating || 5, 5))}</div><blockquote>“{testimonial.text}”</blockquote><figcaption><strong>{testimonial.customerName}</strong>{testimonial.location && <span>{testimonial.location}</span>}</figcaption></figure>)}</div></div></section>}

    {posts.length > 0 && <section className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">FIELD NOTES &amp; INSPIRATION</span><h2>From Our Travel Journal</h2><p>Practical tips and stories to help you plan a more rewarding East African safari.</p></div><Link className="text-link" href="/blog">Read the journal <ArrowRight size={16} /></Link></div><div className="post-grid">{posts.slice(0, 3).map(post => <PostCard key={post._id} post={post} />)}</div></div></section>}

    <section className="closing-cta"><div className="container closing-inner"><div><span className="eyebrow">LET’S PLAN YOUR SAFARI</span><h2>Your East African journey starts here.</h2><p>Tell us what inspires you. We’ll help make a thoughtful, personal itinerary.</p></div><Link className="button button-orange" href="/contact">Request a quote <ArrowRight size={17} /></Link></div></section>
  </main>
}
