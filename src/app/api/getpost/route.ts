import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug'); // Extract slug from query parameters

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  // Try both .md and .mdx extensions
  let filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data: rawData } = matter(fileContent);

  // Ensure required properties exist
  if (!rawData.title || !rawData.date) {
    return NextResponse.json({ error: 'Post is missing required frontmatter' }, { status: 500 });
  }

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

  return NextResponse.json({
    content: contentHtml,
    data: rawData,
    readingTime,
    headings
  });
}
