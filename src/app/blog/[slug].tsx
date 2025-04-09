import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function BlogPost({ content, title, date }: { content: string; title: string; date: string }) {
  return (
    <article className="py-16 md:py-24 bg-background">
      <div className="container max-w-3xl mx-auto text-center px-4">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">{title}</h1>
        <p className="text-muted-foreground text-sm mb-6">{date}</p>
        <div className="prose">{content}</div>
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    props: {
      title: data.title,
      date: data.date,
      content: content,
    },
  };
}
