import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// Define the type of a single post
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
}

export default async function BlogIndex() {
  // Get all blog posts
  const posts = await getPosts();

  return (
    <main className="bg-gray-50 text-gray-800 pb-24">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Blog</h1>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-2">{post.excerpt}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.date}</span>
                <span>📖 {post.readingTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

// Server-side function to fetch all blog posts
async function getPosts(): Promise<Post[]> {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
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
  
  return posts;
}
