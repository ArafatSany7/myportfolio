"use client";

import { motion } from "framer-motion";
import { User, Code, Target, Zap } from "lucide-react";

const ABOUT_CARDS = [
  {
    title: "Who I Am",
    icon: <User className="w-8 h-8 text-primary" />,
    description: "I am a passionate Software Engineering student with a deep interest in Full Stack Development. I love solving problems and creating impactful digital solutions that enhance user experiences."
  },
  {
    title: "What I'm Doing",
    icon: <Code className="w-8 h-8 text-primary" />,
    description: "Currently, I am focusing on building robust web applications using Next.js, TypeScript, and modern backend architectures. I continuously explore new tools to improve performance and scalability."
  },
  {
    title: "My Skills",
    icon: <Zap className="w-8 h-8 text-primary" />,
    description: "My technical expertise spans across Frontend (React, Next.js, Tailwind), Backend (Node.js, Express, PostgreSQL, Prisma), and system design. I enjoy turning complex requirements into clean code."
  },
  {
    title: "Future Goal",
    icon: <Target className="w-8 h-8 text-primary" />,
    description: "My long-term objective is to become a highly proficient Lead Full Stack Engineer and architect systems at scale. I also aim to contribute more to open-source and the developer community."
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block group relative mb-6 cursor-default">
            <h2 className="text-3xl md:text-4xl font-bold pb-2">About Me</h2>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-primary group-hover:w-full transition-all duration-300 ease-out rounded-full"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A quick glimpse into my background, what I do, my skills overview, and where I am heading in my career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card bg-background shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-border"
            >
              <div className="card-body items-center text-center">
                <div className="p-4 bg-primary/10 rounded-2xl mb-4">
                  {card.icon}
                </div>
                <h3 className="card-title text-xl mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
