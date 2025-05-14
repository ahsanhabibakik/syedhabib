import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import BlogTeaser from "@/components/sections/BlogTeaser";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GoogleTagManager } from '@next/third-parties/google';

export default async function Home() {
  // Create blog directory if it doesn't exist
  const blogDir = path.join(process.cwd(), "src/content/blog");
  
  // Ensure the blog directory exists
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  
  // Get blog posts
  let posts: Array<{ slug: string; title: string; excerpt: string; date: string }> = [];
  
  try {
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md')).slice(0, 2);
    
    posts = blogFiles.map((file) => {
      try {
        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
          slug: file.replace(/\.md$/, ""),
          title: data.title || 'Untitled',
          excerpt: data.excerpt || '',
          date: data.date || new Date().toISOString(),
        };
      } catch (error) {
        console.error(`Error reading blog post ${file}:`, error);
        return null;
      }
    }).filter(Boolean) as Array<{ slug: string; title: string; excerpt: string; date: string }>;
  } catch (error) {
    console.error('Error reading blog directory:', error);
  }

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <BlogTeaser posts={posts} />
      <Contact />
      <Footer />
      <GoogleTagManager gtmId="GTM-NLRZDN5P" />
    </>
  );
}
