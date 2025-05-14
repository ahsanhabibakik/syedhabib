"use client";

import { Button } from "@/components/ui/button";
import siteConfig from "@/content/siteConfig";
import { motion } from "framer-motion";
import { ArrowRight, Mouse, ArrowDown, Check } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Digital Marketing & Web Development Expert
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Transforming Ideas Into{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Digital Success
          </span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I help businesses establish a powerful online presence through strategic digital marketing 
          and custom web solutions that drive real results and sustainable growth.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#contact" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto group">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a href="#projects" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View My Work
            </Button>
          </a>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {["Web Development", "SEO Optimization", "Social Media Marketing", "Content Strategy"].map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      >
        <div className="w-8 h-12 border-2 border-foreground/20 rounded-2xl flex justify-center p-1 mb-2">
          <motion.div 
            className="w-2 h-2 bg-foreground/60 rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
      </motion.div>

      {/* Animated background elements */}
      <motion.div 
        className="absolute top-1/4 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.8, 0.9, 0.8]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
}
