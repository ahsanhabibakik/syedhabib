"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Briefcase, Code, BarChart, Leaf, Award, Globe, type LucideIcon } from 'lucide-react';

type IconType = LucideIcon;

interface StatItem {
  label: string;
  value: string;
  icon: IconType;
  description?: string;
}

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
  icon?: IconType;
}

const stats: StatItem[] = [
  { 
    label: 'Years Experience', 
    value: '3+', 
    icon: Briefcase,
    description: 'In digital marketing & web development'
  },
  { 
    label: 'Projects Completed', 
    value: '50+', 
    icon: Code,
    description: 'Across various industries and business sizes'
  },
  { 
    label: 'Marketing Campaigns', 
    value: '100+', 
    icon: BarChart,
    description: 'Driving measurable business growth'
  },
  { 
    label: 'eBrikkho Impact', 
    value: '500+', 
    icon: Leaf,
    description: 'Eco-friendly products delivered'
  },
];

const TimelineItem = ({ year, title, description, isLast = false, icon: Icon }: TimelineItemProps) => {
  return (
    <div className="flex group">
      <div className="flex flex-col items-center mr-6">
        {Icon && (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
            {React.createElement(Icon, { className: 'h-5 w-5' })}
          </div>
        )}
        {!isLast && <div className="w-px h-full bg-border" />}
      </div>
      <div className="pb-12">
        <p className="text-sm font-medium text-muted-foreground">{year}</p>
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="about">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/30 pointer-events-none"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.span 
            className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            MY JOURNEY
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Building Digital Success Stories
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I transform business challenges into growth opportunities through strategic digital solutions and innovative thinking.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-28">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6">Who I Am</h3>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    I'm <span className="font-medium text-foreground">Syed Mir Ahsan Habib</span>, a results-driven digital strategist and full-stack developer with a passion for creating digital experiences that deliver measurable business impact.
                  </p>
                  <p>
                    My expertise lies at the intersection of technology and marketing, where I help businesses leverage digital channels to achieve their growth objectives and outpace their competition.
                  </p>
                  <p>
                    As the co-founder of <span className="font-medium text-foreground">eBrikkho</span>, I've combined my technical expertise with a commitment to sustainability, creating a brand that delivers both environmental and business value.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-muted/30 p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {React.createElement(stat.icon, { className: 'h-5 w-5' })}
                    </div>
                    <h4 className="text-2xl font-bold mb-1">{stat.value}</h4>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    {stat.description && (
                      <p className="text-xs mt-2 text-muted-foreground/70">{stat.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="sticky top-24 bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border/50">
              <h3 className="text-3xl font-bold mb-8">My Journey</h3>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-border via-border/50 to-transparent"></div>
                
                <div className="space-y-2">
                  <TimelineItem 
                    year="2021 - Present" 
                    title="Digital Strategist & Developer"
                    description="Helping businesses grow through digital transformation and innovative web solutions"
                    icon={Briefcase}
                  />
                  <TimelineItem 
                    year="2020 - 2021" 
                    title="Co-founded eBrikkho"
                    description="Built a sustainable brand focused on eco-friendly products and digital presence"
                    icon={Leaf}
                  />
                  <TimelineItem 
                    year="2019 - 2020" 
                    title="Freelance Developer"
                    description="Worked with clients worldwide to build custom web applications and digital solutions"
                    icon={Code}
                  />
                  <TimelineItem 
                    year="2018 - 2019" 
                    title="Started My Journey"
                    description="Began exploring web development and digital marketing"
                    icon={Award}
                    isLast={true}
                  />
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border/50">
                <Globe className="h-8 w-8 text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">Global Experience</h4>
                <p className="text-muted-foreground text-sm">
                  Worked with clients and teams from over 10 countries, delivering digital solutions that drive real business impact.
                </p>
              </div>
            </div>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    {React.createElement(Icon, { className: 'w-6 h-6 text-primary' })}
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8 text-center">My Journey</h3>
          <div className="space-y-1">
            <TimelineItem 
              year="2020 - Present" 
              title="Digital Marketing Strategist & Web Developer"
              description="Helping businesses grow through strategic digital marketing and custom web solutions."
              icon={Briefcase}
            />
            <TimelineItem 
              year="2019 - Present" 
              title="Co-founder at eBrikkho"
              description="Building a sustainable plant-based brand focused on environmental impact and innovation."
              icon={Leaf}
            />
            <TimelineItem 
              year="2018 - 2019" 
              title="Freelance Digital Marketer"
              description="Started my journey in digital marketing, helping local businesses establish their online presence."
              icon={Code}
            />
            <TimelineItem 
              year="2017 - 2018" 
              title="Marketing Intern"
              description="Gained hands-on experience in digital marketing strategies and campaign management."
              isLast
              icon={Award}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
