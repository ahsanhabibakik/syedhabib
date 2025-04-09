import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { remark } from 'remark';
import html from 'remark-html';

interface PostParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
  const { slug } = params;
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const filePath = path.join(blogDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return {
      title: 'Post Not Found',
    };
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  
  return {
    title: data.title,
    description: data.excerpt,
  };
}

export default async function BlogPost({ params }: PostParams) {
  const { slug } = params;
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const filePath = path.join(blogDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();
  
  return (
    <main className="py-20 px-4">
      <article className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1>{data.title}</h1>
        <div className="text-sm text-muted-foreground mb-8">
          {new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </main>
  );
} 