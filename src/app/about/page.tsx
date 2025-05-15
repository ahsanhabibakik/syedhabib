import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Syed Mir Ahsan Habib",
  description: "Learn more about Syed Mir Ahsan Habib (Syed Mir Habib, Ahsan Habib Akik, Syed Habib) - Developer, Creator, and Tech Enthusiast",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Syed Mir Ahsan Habib</h1>

      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Hello! I&apos;m Syed Mir Ahsan Habib (also known as Syed Mir Habib, Ahsan Habib Akik, or Syed Habib).
          I&apos;m a passionate developer and tech enthusiast who loves building real-world projects.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">My Journey</h2>
        <p className="mb-6">
          I believe in learning by doing. This website showcases my journey of building real projects
          and sharing knowledge with the developer community.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Skills & Expertise</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Web Development (React, Next.js, TypeScript)</li>
          <li>Full-Stack Development</li>
          <li>UI/UX Design</li>
          <li>Problem Solving</li>
          <li>Technical Writing</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Connect With Me</h2>
        <p className="mb-6">
          I&apos;m always open to connecting with fellow developers and tech enthusiasts.
          Feel free to reach out through my social media profiles or email.
        </p>
      </div>
    </main>
  );
} 