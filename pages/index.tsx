import Head from "next/head"
import type { InferGetStaticPropsType } from "next"
import { siteMetadata, siteViewport } from "@/lib/site-metadata"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getDestinations, getGallery, getPosts, getServices, getSiteSettings, getTours, getSanityImageUrl } from "@/lib/sanity"
import { GOOGLE_PROFILE_URL, TRIPADVISOR_LISTING_URL } from "@/lib/review-links"
import { ServiceCards, specialties } from "@/components/service-cards"
import { HeroMedia } from "@/components/hero-media"
import { DestinationCard, PostCard, TourGrid } from "@/components/content"

const metadata = {
  title: "Uganda Birding & Primate Safaris",
  description: "Plan Uganda birding, gorilla and chimpanzee trekking, wildlife and community safaris with Phenom Tours. Choose a journey tailored to your dates and budget.",
  verification: { google: "u_g98yNCHI1k-60Ud9yTuMnbeVp9HM2JgZ3YuDbGLL8" },
}

export async function getStaticProps() {
  const [tours, destinations, services, posts, gallery, settings] = await Promise.all([getTours(), getDestinations(), getServices(), getPosts(), getGallery(), getSiteSettings()])
  const video = settings?.heroBackgroundVideo?.asset?.url
  const poster = settings?.heroVideoPoster?.url
  const customVideo = video && !video.endsWith("/775ad414da4903fb27d3bc4bedac81aa69c86229.mp4") ? video : undefined
  const customPoster = poster && !poster.endsWith("/ac13834cb28ff40ed6c34db8d5015ae073e474e9-1080x1080.jpg")
    ? getSanityImageUrl(settings.heroVideoPoster, 1080)
    : undefined
  const featuredTours = tours.filter(tour => tour.featured).slice(0, 6)
  const selectedTours = featuredTours.length ? featuredTours : tours.slice(0, 6)
  return {
    props: {
      selectedTours: selectedTours.map(({ _id, title, slug, country, duration, shortDescription, price, priceDescription, featuredImage }) => ({
        _id, title, slug, country, duration, shortDescription, price, priceDescription, featuredImage,
      })),
      destinations,
      services,
      posts: posts.slice(0, 3).map(({ _id, title, slug, excerpt, publishedAt, featuredImage }) => ({
        _id, title, slug, excerpt, publishedAt, featuredImage,
      })),
      gallery: gallery.filter(item => item.image?.url).slice(0, 3),
      customVideo: customVideo ?? null,
      customPoster: customPoster ?? null,
    },
    revalidate: 60,
  }
}

export default function HomePage({ selectedTours, destinations, services, posts, gallery, customVideo, customPoster }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <>
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="application-name" content={siteMetadata.applicationName} />
      <meta name="author" content={siteMetadata.authors[0].name} />
      <meta name="keywords" content={siteMetadata.keywords.join(", ")} />
      <meta name="creator" content={siteMetadata.creator} />
      <meta name="publisher" content={siteMetadata.publisher} />
      <meta name="msvalidate.01" content={siteMetadata.other["msvalidate.01"]} />
      <meta name="google-site-verification" content={metadata.verification.google} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content={siteViewport.themeColor} />
      <meta name="color-scheme" content={siteViewport.colorScheme} />
      <link rel="canonical" href={siteMetadata.metadataBase.origin} />
      <link rel="shortcut icon" href={siteMetadata.icons.shortcut} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/logo.png" type="image/png" />
      <link rel="apple-touch-icon" href={siteMetadata.icons.apple} />
      <meta property="og:title" content={siteMetadata.openGraph.title} />
      <meta property="og:description" content={siteMetadata.openGraph.description} />
      <meta property="og:site_name" content={siteMetadata.openGraph.siteName} />
      <meta property="og:locale" content={siteMetadata.openGraph.locale} />
      <meta property="og:type" content={siteMetadata.openGraph.type} />
      <meta name="twitter:card" content={siteMetadata.twitter.card} />
      <meta name="twitter:title" content={siteMetadata.twitter.title} />
      <meta name="twitter:description" content={siteMetadata.twitter.description} />
    </Head>
    <main>
    <section className="hero" aria-label="Uganda safari experiences">
      <HeroMedia customVideo={customVideo ?? undefined} customPoster={customPoster ?? undefined} />
      <div className="hero-shade" />
      <div className="hero-content"><span className="hero-kicker">UGANDA · KENYA · RWANDA · TANZANIA</span>
        <h1>Uganda Birding, Primate, Wildlife &amp; Community Safaris</h1>
        <p>Discover East Africa through personalised budget, midrange and luxury journeys with Phenom Tours and Travel.</p>
        <div className="hero-actions"><Link className="button button-orange" href="/tour-packages">Explore Safaris</Link><Link className="button button-outline" href="/contact">Request a Quote</Link></div>
      </div><a className="hero-scroll" href="#why-phenom" aria-label="Scroll to discover">↓</a>
    </section>

    <section id="why-phenom" className="section section-white"><div className="container why-layout"><div className="why-copy"><span className="eyebrow">A JOURNEY THAT FEELS LIKE YOURS</span><h2>Why Choose Phenom Tours &amp; Travel?</h2><p>We create authentic East African experiences with thoughtful planning, local knowledge, and a focus on meaningful travel.</p><p>Our team of expert guides, local partnerships, and personalized service ensure every moment of your journey is extraordinary. From mountain gorilla trekking to wildlife safaris, we handle every detail with care.</p><Link className="text-link" href="/about">Discover our story <ArrowRight size={16} /></Link></div>
      <div className="feature-grid">{specialties.map(({ icon: Icon, title, body }) => <article className="feature" key={title}><span className="feature-icon"><Icon size={23} /></span><h3>{title}</h3><p>{body}</p></article>)}</div></div>
      <div className="container stats-row"><div><strong>4</strong><span>Countries to explore</span></div><div><strong>41+</strong><span>Thoughtfully planned tours</span></div><div><strong>Personal</strong><span>Local expertise</span></div><div><strong>Tailored</strong><span>Flexible planning</span></div></div>
    </section>

    <section id="destinations" className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">EXPLORE EAST AFRICA</span><h2>Explore Our Destinations</h2><p>Discover the best of East Africa with expertly curated tours across Uganda, Kenya, Rwanda, and Tanzania.</p></div><Link className="text-link" href="/destinations">All destinations <ArrowRight size={16} /></Link></div>
      <div className="destination-grid">{destinations.map(destination => <DestinationCard key={destination._id} destination={destination} />)}</div></div></section>

    <section className="section section-white"><div className="container"><div className="section-heading"><div><span className="eyebrow">TRAVEL YOUR WAY</span><h2>Featured Safari Packages</h2><p>Choose a starting point, then let us shape the details around your travel style.</p></div><Link className="text-link" href="/tour-packages">View all packages <ArrowRight size={16} /></Link></div><TourGrid tours={selectedTours} /></div></section>

    <section className="section section-green" id="services"><div className="container"><div className="section-heading section-heading-light"><div><span className="eyebrow">PERSONAL SERVICE, THOUGHTFUL DETAIL</span><h2>Explore Your Way</h2><p>From the first idea to the last transfer, we help you make the most of East Africa.</p></div></div><ServiceCards services={services} /><Link className="service-directory-link" href="/services">Explore our services <ArrowRight size={16} aria-hidden="true" /></Link></div></section>

    <section id="reviews" className="section section-white"><div className="container">
      <div className="section-heading"><div><span className="eyebrow">REVIEWS FROM OUR GUESTS</span><h2>Read travellers’ reviews</h2><p>Open our official review profiles to read the latest feedback. New reviews appear there as the platforms publish them.</p></div></div>
      <div className="review-grid review-source-grid">
        <article className="review-card review-source-card">
          <span className="eyebrow">GOOGLE BUSINESS PROFILE</span>
          <h3>Google reviews</h3>
          <p>Read guest ratings and reviews on Google Maps.</p>
          <a className="review-source-link" href={GOOGLE_PROFILE_URL} target="_blank" rel="noreferrer">Read Google reviews <ArrowRight size={16} aria-hidden="true" /></a>
        </article>
        <article className="review-card review-source-card">
          <span className="eyebrow">TRIPADVISOR</span>
          <h3>Tripadvisor traveller reviews</h3>
          <p>Read current traveller feedback on Tripadvisor.</p>
          <a className="review-source-link" href={TRIPADVISOR_LISTING_URL} target="_blank" rel="noreferrer">Read Tripadvisor reviews <ArrowRight size={16} aria-hidden="true" /></a>
        </article>
      </div>
    </div></section>

    {posts.length > 0 && <section className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">FIELD NOTES &amp; INSPIRATION</span><h2>From Our Travel Journal</h2><p>Practical tips and stories to help you plan a more rewarding East African safari.</p></div><Link className="text-link" href="/blog">Read the journal <ArrowRight size={16} /></Link></div><div className="post-grid">{posts.map(post => <PostCard key={post._id} post={post} />)}</div></div></section>}

    {gallery.length > 0 && <section className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">MOMENTS FROM THE JOURNEY</span><h2>See East Africa Through Our Lens</h2><p>Wildlife, landscapes and the people who make each journey memorable.</p></div><Link className="text-link" href="/gallery">Explore the gallery <ArrowRight size={16} /></Link></div><div className="gallery-grid">{gallery.map(item => <figure className="gallery-item" key={item._id}><Link href="/gallery" aria-label={`See more photos: ${item.title}`}><img src={getSanityImageUrl(item.image, 900)} alt={item.image?.alt || item.title} loading="lazy" /><figcaption><span>{item.country}</span><strong>{item.title}</strong></figcaption></Link></figure>)}</div></div></section>}

    <section className="closing-cta"><div className="container closing-inner"><div><span className="eyebrow">LET’S PLAN YOUR SAFARI</span><h2>Your East African journey starts here.</h2><p>Tell us what inspires you. We’ll help make a thoughtful, personal itinerary.</p></div><Link className="button button-orange" href="/contact">Use the enquiry form <ArrowRight size={17} /></Link></div></section>
    </main>
  </>
}
