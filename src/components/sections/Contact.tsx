"use client";

import siteConfig from "@/content/siteConfig";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-20 bg-muted/50 text-center" id="contact">
      <div className="container max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Let&apos;s Connect</h2>
        <p className="text-muted-foreground text-lg mb-6">
          Want to collaborate or have a project in mind? I&apos;d love to hear from you.
        </p>

        <a href={`mailto:${siteConfig.email}`} className="inline-flex gap-2 items-center">
          <Button size="lg">
            <Mail size={18} /> {siteConfig.email}
          </Button>
        </a>
      </div>
    </section>
  );
}
