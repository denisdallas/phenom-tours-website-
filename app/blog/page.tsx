import { getPosts } from "@/lib/sanity"
import { PageIntro, PostCard } from "@/components/content"

export const metadata = { title: "Travel Journal | Phenom Tours & Travel", description: "Stories, inspiration and practical travel advice for planning an East African safari.", alternates: { canonical: "/blog" } }
export default async function BlogPage() { const posts = await getPosts(); return <main><PageIntro title="Travel Journal" description="Stories, inspiration and practical advice for planning an East African safari." /><section className="content-section"><div className="container"><div className="post-grid">{posts.map(post => <PostCard key={post._id} post={post} />)}</div>{!posts.length && <div className="empty-state">New travel stories are on their way. In the meantime, explore our <a className="text-link" href="/tour-packages">safari packages</a>.</div>}</div></section></main> }
