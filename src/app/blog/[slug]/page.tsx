import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import './blog-post.css';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src/content/blog');
  const files = fs.readdirSync(dir);
  return files.map((file) => ({
    slug: file.replace(/\.mdx?$/, ''),
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
    if (!fs.existsSync(filePath)) return notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  return (
    <main className="pb-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-slate-100 py-20 mb-12 border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
            {data.title}
          </h1>
          <p className="text-muted-foreground text-sm mt-4">{data.date}</p>
        </div>
      </section>

      {/* Blog Content */}
      <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto px-4 fade-in">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
