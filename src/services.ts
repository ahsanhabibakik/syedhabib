import { Code, Monitor, BarChart, Search, PenTool, Smartphone } from 'lucide-react';
import React from 'react';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const iconSize = 24; // Size for all icons

const services: Service[] = [
  {
    title: "Web Development",
    description: "Custom, high-performance websites and web applications built with modern technologies that deliver exceptional user experiences and drive business growth.",
    icon: React.createElement(Code, { size: iconSize }),
    features: [
      "Custom website development",
      "E-commerce solutions",
      "Web application development",
      "API integration",
      "Responsive design",
      "Performance optimization"
    ]
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that enhance user engagement and drive conversions through thoughtful design and seamless user experiences.",
    icon: React.createElement(Monitor, { size: iconSize }),
    features: [
      "User research & analysis",
      "Wireframing & prototyping",
      "UI/UX design",
      "Design systems",
      "User testing",
      "Design-to-code handoff"
    ]
  },
  {
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that increase brand visibility, generate leads, and drive sustainable business growth across digital channels.",
    icon: React.createElement(BarChart, { size: iconSize }),
    features: [
      "Social media marketing",
      "Content marketing",
      "Email marketing",
      "PPC advertising",
      "Marketing automation",
      "Analytics & reporting"
    ]
  },
  {
    title: "SEO Optimization",
    description: "Comprehensive SEO strategies that improve search engine rankings, increase organic traffic, and boost online visibility for your business.",
    icon: React.createElement(Search, { size: iconSize }),
    features: [
      "Keyword research",
      "On-page & technical SEO",
      "Content optimization",
      "Link building",
      "Local SEO",
      "SEO audits"
    ]
  },
  {
    title: "Content Strategy",
    description: "Compelling content that resonates with your audience, builds brand authority, and drives meaningful engagement across all platforms.",
    icon: React.createElement(PenTool, { size: iconSize }),
    features: [
      "Content planning",
      "Blog writing",
      "Copywriting",
      "Content audits",
      "Editorial calendar",
      "Content distribution"
    ]
  },
  {
    title: "Mobile Optimization",
    description: "Mobile-first solutions that ensure your website and content deliver exceptional experiences across all devices and screen sizes.",
    icon: React.createElement(Smartphone, { size: iconSize }),
    features: [
      "Responsive design",
      "Mobile UX optimization",
      "Progressive web apps",
      "Mobile performance",
      "App-like experiences",
      "Cross-browser testing"
    ]
  }
];

export default services;