import projects, { Project } from "@/projects";

export default function ProjectsPage() {
  return (
    <main className="py-20 md:py-32">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: Project) => (
            <a
              key={project.name}
              href={project.link}
              className="block bg-white dark:bg-black border border-border rounded-xl p-6 hover:shadow-md transition group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">
                {project.name}
              </h2>
              <p className="text-muted-foreground">{project.description}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
