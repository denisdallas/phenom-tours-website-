import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPosts, getSanityImageUrl } from "@/lib/sanity"
import { PortableBody } from "@/components/content"

async function findPost(slug: string) {
  const posts = await getPosts()
  return posts.find(post => post.slug === slug || encodeURIComponent(post.slug) === slug)
}

export async function generateStaticParams() { const posts = await getPosts(); return posts.map(post => ({ slug: post.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const post = await findPost(slug); if (!post) return { title: "Travel Journal" }; return { title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, alternates: { canonical: `/blog/${encodeURIComponent(post.slug)}` }, openGraph: { images: getSanityImageUrl(post.featuredImage) ? [getSanityImageUrl(post.featuredImage)!] : [] } } }
export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = await findPost(slug); if (!post) notFound(); return <main><article className="article-layout"><p className="eyebrow">{post.category || "PHENOM TRAVEL JOURNAL"}</p><h1>{post.title}</h1><p className="card-meta">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""}{post.author?.name ? ` · ${post.author.name}` : ""}</p>{getSanityImageUrl(post.featuredImage) && <img className="article-hero" src={getSanityImageUrl(post.featuredImage, 1600)} alt={post.featuredImage?.alt || post.title} />}{post.excerpt && <p className="article-lede">{post.excerpt}</p>}<PortableBody value={post.body} /></article></main> }
