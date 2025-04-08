export interface Service {
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    title: "Facebook Ads",
    description: "Effective ad campaigns that drive results for local businesses",
    icon: "📱"
  },
  {
    title: "Web Design",
    description: "Custom websites that help businesses establish their online presence",
    icon: "💻"
  }
];

export default services; 