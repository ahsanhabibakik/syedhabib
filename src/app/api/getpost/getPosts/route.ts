import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  
  if (!fs.existsSync(blogDir)) {
    return NextResponse.json({ error: 'Blog directory not found' }, { status: 404 });
  }
  
  const files = fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
  
  const posts = files.map(file => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const slug = file.replace(/\.mdx?$/, '');
    
    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || 'No date',
      excerpt: data.excerpt || '',
      readingTime: Math.ceil((fileContent.split(/\s+/).length) / 200)
    };
  });
  
  // Sort posts by date (newest first)
  posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return NextResponse.json(posts);
} 