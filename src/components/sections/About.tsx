"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-muted/50" id="about">
      <motion.div
        className="container max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">About Me</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          I&apos;m <strong>Syed Mir Ahsan Habib</strong> — but most people call me <strong>Akik</strong>.  
          I&apos;m a digital marketing freelancer who helps local businesses run effective Facebook Ads that get results.  
          I&apos;m also a beginner web designer, learning by building real projects (like this website!).
          <br /><br />
          Along the way, I&apos;ve co-founded a plant-based brand called <strong>eBrikkho</strong>, and I plan to grow into writing ebooks and blogs about marketing, business, and — yes — even plants.
          <br /><br />
          This site is my digital garden. Thanks for stopping by. 🌱
        </p>
      </motion.div>
    </section>
  );
}
