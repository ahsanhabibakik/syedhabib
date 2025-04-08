// components/sections/Services.tsx
import services from "@/content/services";

export default function Services() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-semibold mb-8 text-center">What I Offer</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.title} className="p-6 rounded-xl bg-muted/20">
              <h3 className="text-xl font-semibold mb-2">{service.icon} {service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
