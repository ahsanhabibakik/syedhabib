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

  // Calculate reading time
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);

  // Extract headings for TOC (## and ###)
  const headings = content
    .split('\n')
    .filter(line => line.startsWith('## ') || line.startsWith('### '))
    .map((line) => {
      const level = line.startsWith('## ') ? 2 : 3;
      const title = line.replace(/^#+\s*/, ''); // Remove '## ' or '### ' from start of the line
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-'); // Create an ID from the title
      return { title, level, id };
    });

  return (
    <main className="pb-24 flex gap-12">
      {/* Sticky Table of Contents (TOC) */}
      <aside className="hidden lg:block sticky top-20 max-w-xs self-start px-4">
        <h3 className="text-xl font-semibold">Table of Contents</h3>
        <ul className="space-y-2 mt-4">
          {headings.map((heading) => (
            <li key={heading.id} className={`pl-${heading.level * 2}`}>
              <a href={`#${heading.id}`} className="text-gray-900 hover:text-blue-500">
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Blog Content */}
      <section className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-slate-100 py-20 mb-12 border-b shadow-sm">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
              {data.title}
            </h1>
            <p className="text-muted-foreground text-sm mt-4">
              {data.date} · 📖 {readingTime} min read
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto px-4 fade-in">
          <MDXRemote source={content} />
        </article>
      </section>
    </main>
  );
}
