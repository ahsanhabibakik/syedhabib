"use client";

import { Button } from "@/components/ui/button";
import siteConfig from "@/content/siteConfig";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hi, I&apos;m {siteConfig.shortName}
      </motion.h1>
      <motion.p
        className="max-w-xl text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        A digital marketing freelancer & budding web designer, helping local businesses grow — one ad and one pixel at a time.
      </motion.p>
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <a href="#contact">
          <Button>Work with me</Button>
        </a>
        <a href="#projects">
          <Button variant="outline">See my work</Button>
        </a>
      </motion.div>
    </section>
  );
}
