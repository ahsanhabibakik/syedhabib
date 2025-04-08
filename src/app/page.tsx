import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import BlogTeaser from "@/components/sections/BlogTeaser";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function Home() {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const posts = !fs.existsSync(blogDir) ? [] : fs.readdirSync(blogDir)
    .slice(0, 2)
    .map((file) => {
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
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <BlogTeaser posts={posts} />
      <Contact />
      <Footer />
    </>
  );
}
