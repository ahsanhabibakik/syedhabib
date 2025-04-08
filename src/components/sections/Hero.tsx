"use client";

import { Button } from "@/components/ui/button";
import siteConfig from "@/content/siteConfig";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="py-20 md:py-32 text-center bg-background">
      <motion.div
        className="container max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Hey, I’m {siteConfig.shortName}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          A digital marketing freelancer & budding web designer, helping local
          businesses grow — one ad and one pixel at a time.
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <a href="#contact">Work with me</a>
          </Button>
          <Button variant="outline" asChild size="lg">
            <a href="#projects">See my work</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
