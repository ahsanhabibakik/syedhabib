import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SiteConfig {
  shortName: string;
  fullName: string;
  title: string;
  description: string;
  url: string;
  email: string;
  location: string;
  links: {
    twitter: string;
    github: string;
    linkedin: string;
    email: string;
  };
  socialLinks: SocialLink[];
}

const siteConfig: SiteConfig = {
  shortName: "Syed",
  fullName: "Syed Habib",
  title: "Digital Marketing Freelancer & Web Designer",
  description: "A digital marketing freelancer & budding web designer, helping local businesses grow — one ad and one pixel at a time.",
  url: "https://syedhabib.com",
  email: "syedmirhabib@gmail.com",
  location: "Dhaka, Bangladesh",
  links: {
    twitter: "https://twitter.com/syedmirhabib",
    github: "https://github.com/syedmirhabib",
    linkedin: "https://linkedin.com/in/syedmirhabib",
    email: "mailto:syedmirhabib@gmail.com"
  },
  socialLinks: [
    {
      name: "Twitter",
      url: "https://twitter.com/syedmirhabib",
      icon: Twitter
    },
    {
      name: "GitHub",
      url: "https://github.com/syedmirhabib",
      icon: Github
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/syedmirhabib",
      icon: Linkedin
    },
    {
      name: "Email",
      url: "mailto:syedmirhabib@gmail.com",
      icon: Mail
    }
  ]
};

export default siteConfig;