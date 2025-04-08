"use client";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function BlogTeaser() {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(blogDir).slice(0, 2); // latest 2 posts

  const posts = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug: file.replace(".md", ""),
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
    };
  });

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
          <Link
            href="/blog"
            className="text-blue-600 hover:underline font-medium"
          >
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
