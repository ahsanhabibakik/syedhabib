// src/app/blog/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const getPosts = async () => {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

  return files.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      title: data.title || filename,
      date: data.date || '',
      excerpt: data.excerpt || '',
      slug: filename.replace(/\.mdx?$/, ''),
    };
  });
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="container py-16 max-w-5xl">
      <h1 className="text-4xl font-semibold mb-10 text-center">Blog</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all bg-background"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-muted-foreground text-sm mb-2">{post.date}</p>
            <p className="text-muted-foreground text-sm">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
