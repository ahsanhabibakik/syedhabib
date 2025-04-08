import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const posts = !fs.existsSync(blogDir) ? [] : fs.readdirSync(blogDir)
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: file.replace(".md", ""),
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="py-20 md:py-32">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Blog</h1>
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-border pb-8">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <time className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
