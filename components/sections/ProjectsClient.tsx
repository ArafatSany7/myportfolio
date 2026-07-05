"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ExternalLink, Info, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FadeIn } from "@/components/animations/FadeIn";
import { motion } from "framer-motion";

export function ProjectsClient({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-12 bg-background rounded-xl border border-border">
        No projects found. Check back later!
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <FadeIn
            key={project.id}
            delay={index * 0.1}
            className="card bg-background/60 backdrop-blur-md shadow-xl overflow-hidden group border border-border/50 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full bg-muted/20 flex items-center justify-center overflow-hidden shrink-0 border-b border-border/30">
              {project.image ? (
                <Image 
                  src={project.image} 
                  alt={project.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="text-muted-foreground font-medium px-4 text-center">
                  No Image Available
                </span>
              )}
            </div>
            <div className="card-body flex flex-col flex-1 p-5">
              <h3 className="card-title text-xl font-bold text-primary mb-1">{project.name || project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(project.tags || []).slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="card-actions justify-end mt-auto pt-4 border-t border-border/50 flex gap-4 items-center">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group/link relative flex items-center gap-1.5 py-1 text-sm font-medium text-foreground transition-colors hover:text-primary">
                    <ExternalLink size={16} /> Live
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover/link:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group/link relative flex items-center gap-1.5 py-1 text-sm font-medium text-foreground transition-colors hover:text-primary">
                    <FaGithub size={16} /> Code
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover/link:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                  </a>
                )}
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="btn btn-sm btn-primary gap-1 px-3 ml-2 text-primary-foreground"
                >
                  <Info size={16} /> Details
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-background rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-border bg-card">
                <h3 className="text-2xl font-bold">{selectedProject.name}</h3>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar bg-background">
                {(() => {
                  const getProjectImages = (proj: any) => {
                    if (!proj.image) return [];
                    if (proj.name === 'Drops For Life') return ['/projects/drop main.png', '/projects/drop 1.png', '/projects/drop 2.png', '/projects/drop 3.png'];
                    if (proj.name === 'Game of Thrones Explorer') return ['/projects/got main.png', '/projects/got 1.png', '/projects/got 2.png'];
                    return [proj.image];
                  };
                  const images = getProjectImages(selectedProject);
                  
                  return images.length > 0 && (
                    <div className="w-full mb-8">
                      {images.length === 1 ? (
                        <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-xl overflow-hidden border border-border/50 shadow-md bg-muted/20">
                          <Image src={images[0]} alt={selectedProject.name} fill sizes="(max-width: 1200px) 100vw, 800px" className="object-contain p-2" />
                        </div>
                      ) : (
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar">
                          {images.map((img, idx) => (
                            <div key={idx} className="relative w-[85%] sm:w-[70%] shrink-0 snap-center rounded-xl overflow-hidden border border-border/50 shadow-md aspect-video bg-muted/20">
                              <Image src={img} alt={`${selectedProject.name} screenshot ${idx+1}`} fill sizes="(max-width: 768px) 85vw, (max-width: 1200px) 70vw, 500px" className="object-contain p-2" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-2">Overview</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{selectedProject.description}</p>
                  </div>
                  
                  {(selectedProject.purpose || selectedProject.targetUsers) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedProject.purpose && (
                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-2">Purpose</h4>
                          <p className="text-muted-foreground text-sm">{selectedProject.purpose}</p>
                        </div>
                      )}
                      {selectedProject.targetUsers && (
                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-2">Target Users</h4>
                          <p className="text-muted-foreground text-sm">{selectedProject.targetUsers}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.tags || []).map((tag: string) => (
                        <span key={tag} className="badge badge-primary badge-outline">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">Key Features</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-2">
                        {selectedProject.keyFeatures.map((feature: string, i: number) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProject.challenges && (
                    <div className="bg-muted p-4 rounded-xl border border-border">
                      <h4 className="text-lg font-semibold text-primary mb-2">Challenges</h4>
                      <p className="text-muted-foreground text-sm">{selectedProject.challenges}</p>
                    </div>
                  )}
                  
                  {selectedProject.futureImprovements && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">Future Improvements</h4>
                      <p className="text-muted-foreground text-sm">{selectedProject.futureImprovements}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
