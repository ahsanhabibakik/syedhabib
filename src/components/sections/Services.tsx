"use client";

import services, { Service } from "@/services";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section className="py-16 md:py-24 bg-background" id="services">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          What I Do
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {services.map((service: Service, index: number) => (
            <motion.div
              key={index}
              className="bg-muted/40 rounded-2xl p-6 text-left shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl mb-2">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
