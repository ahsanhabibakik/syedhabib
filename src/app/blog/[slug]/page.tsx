import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import BlogPostClient from './BlogPostClient';

// Update the interface to match Next.js 15 requirements
interface BlogPostProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface BlogPostData {
  content: string;
  data: {
    title: string;
    date: string;
    [key: string]: string;
  };
  readingTime: number;
  headings: {
    title: string;
    level: number;
    id: string;
  }[];
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src/content/blog');
  const files = fs.readdirSync(dir);
  return files.map((file) => ({
    slug: file.replace(/\.mdx?$/, ''),
  }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  // Get the blog post data
  const post = await getPostData(params.slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}

// Server-side function to fetch the blog post data
async function getPostData(slug: string): Promise<BlogPostData | null> {
  let filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data: rawData } = matter(fileContent);

  // Ensure required properties exist
  if (!rawData.title || !rawData.date) {
    console.warn(`Blog post ${slug} is missing required frontmatter: title or date`);
    return null;
  }

  // Type assertion to ensure data has the required properties
  const data = rawData as { title: string; date: string; [key: string]: string };

  // Calculate reading time
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);

  // Extract headings for TOC (## and ###)
  const headings = content
    .split('\n')
    .filter((line: string) => line.startsWith('## ') || line.startsWith('### '))
    .map((line: string) => {
      const level = line.startsWith('## ') ? 2 : 3;
      const title = line.replace(/^#+\s*/, ''); // Remove '## ' or '### ' from start of the line
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-'); // Create an ID from the title
      return { title, level, id };
    });

  // Process markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  
  const contentHtml = processedContent.toString();

  return { content: contentHtml, data, readingTime, headings };
}
