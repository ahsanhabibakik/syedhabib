import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function BlogTeaser({ posts }: { posts: Post[] }) {
  return (
    <section className="py-16 md:py-24 bg-background" id="blog">
      <div className="container max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">From the Blog</h2>

        <div className="space-y-8 text-left mt-10">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="text-xl font-medium hover:underline">
                {post.title}
              </Link>
              <p className="text-muted-foreground mt-1">{post.excerpt}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/blog" className="text-blue-600 hover:underline font-medium">
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
