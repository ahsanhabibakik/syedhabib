import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services by Syed Mir Ahsan Habib",
  description: "Professional services offered by Syed Mir Ahsan Habib (Syed Mir Habib, Ahsan Habib Akik, Syed Habib) - Web Development, Consulting, and More",
};

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Services</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Web Development</h2>
          <p className="mb-4">
            Custom web applications built with modern technologies like React, Next.js, and TypeScript.
            Focused on performance, accessibility, and user experience.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Frontend Development</li>
            <li>Backend Integration</li>
            <li>Responsive Design</li>
            <li>Performance Optimization</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Technical Consulting</h2>
          <p className="mb-4">
            Expert advice on technology choices, architecture decisions, and development best practices.
            Helping teams make informed decisions for their projects.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Technology Stack Selection</li>
            <li>Architecture Design</li>
            <li>Code Review</li>
            <li>Performance Analysis</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Content Creation</h2>
          <p className="mb-4">
            Technical content that educates and inspires. From blog posts to tutorials,
            helping developers learn and grow in their careers.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Technical Blog Posts</li>
            <li>Code Tutorials</li>
            <li>Documentation</li>
            <li>Technical Writing</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Project Mentoring</h2>
          <p className="mb-4">
            One-on-one guidance for developers working on personal or professional projects.
            Providing feedback, suggestions, and helping overcome challenges.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Code Reviews</li>
            <li>Architecture Guidance</li>
            <li>Problem Solving</li>
            <li>Best Practices</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Interested in working together?</h2>
        <p className="mb-6">
          Let's discuss how I can help with your next project or challenge.
        </p>
        <a 
          href="mailto:contact@syedhabib.com" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Get in Touch
        </a>
      </div>
      
      <p>Don&apos;t hesitate to reach out for a custom solution!</p>
    </main>
  );
} 