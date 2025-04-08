import siteConfig from "@/content/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
      <p>
        &copy; {year} {siteConfig.fullName} — Built with ❤️ using Next.js & ShadCN
      </p>
      <div className="mt-2 flex justify-center gap-4">
        <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </footer>
  );
}
