"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Send } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

          <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl text-primary font-medium mb-3 tracking-wide uppercase">Hello, I am</h2>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-foreground pb-2">
                Arafat Sany
              </h1>
              <h3 className="text-2xl md:text-3xl text-muted-foreground font-semibold mb-6">
                Full Stack Developer
              </h3>

              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                I specialize in building exceptional digital experiences. Currently, I am focused on building accessible, human-centered, and high-performance web applications using modern technologies like Next.js and TypeScript.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <a
                href="#contact"
                className="bg-primary text-primary-foreground font-medium rounded-full px-8 py-3 flex items-center gap-2 hover:scale-105 transition-transform shadow-lg hover:shadow-primary/25"
              >
                <Send size={18} />
                Get In Touch
              </a>
              <a
                href="/resume.pdf"
                download
                className="group relative overflow-hidden border border-foreground text-foreground font-medium rounded-full px-8 py-3 flex items-center justify-center gap-2 hover:scale-105 hover:border-primary hover:text-primary-foreground transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Download size={18} />
                  Download Resume
                </span>
              </a>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative"
              >
                <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-4 border-border shadow-2xl">
                  <Image
                    src="/assets/profile.jpeg"
                    alt="Arafat Sany"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>

                <a
                  href="#contact"
                  className="absolute top-2 -right-2 md:top-6 md:-right-2 lg:top-10 lg:right-0 z-20 bg-background border-2 border-primary text-foreground font-bold px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  Hire Me
                </a>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
