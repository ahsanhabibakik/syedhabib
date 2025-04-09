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
      <div className="container max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10">From the Blog</h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 text-left">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-muted rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-medium mb-2">{post.title}</h3>
              <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              <p className="text-xs text-muted-foreground mt-3">{post.date}</p>
            </Link>
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
