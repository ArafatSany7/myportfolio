"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, X, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export function JourneyClient({ education, certificates }: { education: any[]; certificates: any[] }) {
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  return (
    <section id="journey" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="inline-block group relative mb-6 cursor-default">
            <h2 className="text-3xl md:text-4xl font-bold pb-2">My Journey</h2>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-primary group-hover:w-full transition-all duration-300 ease-out rounded-full"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My academic background, professional experience, and continuous learning path.
          </p>
        </FadeIn>

        <div className="max-w-3xl mx-auto mb-20">
          {}
          <div>
            <div className="flex justify-center items-center gap-3 mb-12">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-center">Education</h3>
            </div>
            
            {(!education || education.length === 0) ? (
              <div className="text-center text-muted-foreground p-8 bg-card rounded-xl border border-border">
                No education records found.
              </div>
            ) : (
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
                {education.map((edu, index) => (
                  <FadeIn 
                    key={edu.id}
                    delay={index * 0.2}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-border bg-primary text-primary-content shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-background rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card bg-muted shadow-md p-5 border border-border hover:border-primary/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <h4 className="font-bold text-lg text-primary">{edu.degree}</h4>
                      </div>
                      <p className="text-foreground font-medium mb-1">{edu.institution}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                        {edu.passingYear && (
                          <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Passing Year</span>
                            <span className="font-semibold text-foreground">{edu.passingYear}</span>
                          </div>
                        )}
                        {(edu.cgpa || edu.gpa) && (
                          <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">CGPA/GPA</span>
                            <span className="font-semibold text-foreground">{edu.cgpa || edu.gpa}</span>
                          </div>
                        )}
                        {edu.currentSemester && (
                          <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-70">Semester</span>
                            <span className="font-semibold text-foreground">{edu.currentSemester}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </div>

        {}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Award className="w-8 h-8 text-primary" />
            <h3 className="text-3xl font-bold text-center">Certifications</h3>
          </div>
          
          {(!certificates || certificates.length === 0) ? (
            <div className="text-center text-muted-foreground p-8 bg-card rounded-xl border border-border max-w-3xl mx-auto">
              No certifications found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <FadeIn
                  key={cert.id}
                  delay={index * 0.1}
                  className="card bg-background shadow-lg border border-border overflow-hidden group flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3] border-b border-border overflow-hidden bg-muted p-4">
                    {cert.image ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={cert.image} 
                          alt={cert.title} 
                          fill 
                          priority={index < 3}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        No Image Available
                      </div>
                    )}
                  </div>
                  <div className="card-body p-5 flex flex-col flex-1">
                    <h4 className="card-title text-lg font-bold">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
                    <div className="card-actions justify-end mt-auto pt-4 border-t border-border">
                      <button 
                        onClick={() => setSelectedCert(cert)}
                        className="group/btn relative overflow-hidden border border-primary text-primary font-medium rounded-lg w-full py-2 flex items-center justify-center gap-2 hover:text-primary-foreground transition-colors duration-300"
                      >
                        <span className="absolute inset-0 w-full h-full bg-primary scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></span>
                        <span className="relative z-10 flex items-center gap-2">
                          <ExternalLink size={16} /> View Credential
                        </span>
                      </button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </div>

      {}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-background rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 btn btn-sm btn-circle btn-neutral shadow-md"
              >
                <X size={18} />
              </button>
              
              <div className="w-full md:w-3/5 bg-muted p-4 flex items-center justify-center relative min-h-[300px]">
                {selectedCert.image ? (
                  <Image 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    fill 
                    sizes="100vw"
                    className="object-contain p-4"
                  />
                ) : (
                  <span className="text-muted-foreground font-medium px-4 text-center">
                    No Image Available
                  </span>
                )}
              </div>
              
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-center bg-background overflow-y-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 w-fit">
                  <Award size={16} /> Certification
                </div>
                <h3 className="text-2xl font-bold mb-2">{selectedCert.title}</h3>
                <p className="text-muted-foreground mb-6 border-b border-border pb-4">Issued by: <span className="font-semibold text-foreground">{selectedCert.issuer}</span></p>
                
                {selectedCert.keyFeatures && selectedCert.keyFeatures.length > 0 && (
                  <>
                    <h4 className="text-lg font-semibold text-primary mb-3">Key Features / Learned:</h4>
                    <ul className="space-y-3">
                      {selectedCert.keyFeatures.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                          <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
