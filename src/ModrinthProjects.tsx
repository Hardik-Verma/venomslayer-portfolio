import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ModrinthIcon } from './ModrinthIcon';
import { X } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const CurseForgeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="currentColor">
    <title>CurseForge</title>
    <path d="M0 0v24h24V0H0zm18.91 16.57c-.24.78-1.25 1.54-2.22 1.83-2.92.88-7.61.2-9.67-2.15-1.42-1.61-1.33-4.04-.42-5.91.43-.88 1.94-3.14 1.94-3.14s-1.34 2.1-1.84 3.01c-.88 1.63-.98 3.55-.17 5.17 1.43 2.87 5.6 3.44 8.67 2.39 1.13-.39 2.13-1.23 2.62-2.31.25-.56.39-1.28.32-1.92-.05-.48-.22-.97-.47-1.38-.28-.46-.7-.88-1.12-1.22-1.54-1.26-3.41-2.19-5.11-3.35-1.07-.73-2.11-1.55-2.98-2.48-.99-1.06-1.74-2.39-1.87-3.83-.16-1.74.52-3.66 1.87-4.83.69-.6 1.55-1.04 2.42-1.26.85-.21 1.82-.22 2.61.12.83.36 1.51 1.05 1.82 1.89.31.86.3 1.84.02 2.7-.27.83-.81 1.56-1.36 2.27 1.35.95 2.81 1.79 4.09 2.82 1.07.87 2.05 1.93 2.49 3.22.45 1.34.42 2.92-.25 4.19z"/>
  </svg>
);

const WebsiteIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="currentColor">
    <title>Website</title>
    <path d="M12.003 21.25a9.25 9.25 0 1 1 0-18.5 9.25 9.25 0 0 1 0 18.5zm0-1.5a7.75 7.75 0 1 0 0-15.5 7.75 7.75 0 0 0 0 15.5zm-3.568-1.737A15.932 15.932 0 0 0 10.36 12a15.932 15.932 0 0 0-1.925-6.013 7.756 7.756 0 0 0 0 12.026zm7.136 0a7.756 7.756 0 0 0 0-12.026A15.932 15.932 0 0 0 13.64 12a15.932 15.932 0 0 0 1.925 6.013zM12 21c-.85 0-2.316-2.883-2.483-6.5h4.966c-.167 3.617-1.633 6.5-2.483 6.5zm0-14c.85 0 2.316 2.883 2.483 6.5H9.517C9.684 9.883 11.15 7 12 7z"/>
  </svg>
);

const PROJECT_ARCHIVE = [
  { id: "betterchatheads", title: "Better Chat Heads", desc: "A high-performance client-side utility that improves chat readability by rendering player head avatars next to messages.", tags: ["Fabric", "Client"], githubUrl: "https://github.com/Hardik-Verma/BetterChatHeads", modrinthUrl: "https://modrinth.com/mod/betterchatheads", curseforgeUrl: "#", websiteUrl: null },
  { id: "betterhitsounds", title: "Better Hit Sounds", desc: "A competitive combat audio engine that replaces default sounds with precise acoustic cues for immediate gameplay feedback.", tags: ["Fabric", "Audio"], githubUrl: "https://github.com/Hardik-Verma", modrinthUrl: "https://modrinth.com/mod/betterhitsounds", curseforgeUrl: "#", websiteUrl: null },
  { id: "customgameicon", title: "Custom Game Icon", desc: "A lightweight customization tool for the Minecraft client window.", tags: ["Fabric", "Client"], githubUrl: "https://github.com/Hardik-Verma", modrinthUrl: "https://modrinth.com/mod/customgameicon", curseforgeUrl: "#", websiteUrl: null },
  { id: "macebot", title: "MaceBot", desc: "A training utility for the 1.21+ Mace weapon mechanics. Spawns an AI opponent for Mace PvP/PvE duels.", tags: ["Fabric", "AI", "Combat"], githubUrl: "https://github.com/Hardik-Verma", modrinthUrl: "https://modrinth.com/mod/macebot", curseforgeUrl: "#", websiteUrl: null },
  { id: "zyrenauth", title: "ZyrenAUTH", desc: "A comprehensive authentication security plugin for Minecraft servers featuring graphical 2FA.", tags: ["Plugin", "Security"], githubUrl: "https://github.com/Hardik-Verma", modrinthUrl: "#", curseforgeUrl: "#", websiteUrl: "#" },
  { id: "smartcrosshair", title: "Smart Crosshair", desc: "Dynamic crosshair implementation responding to game context, entities, and active items.", tags: ["Fabric", "UI"], githubUrl: null, modrinthUrl: "https://modrinth.com/mod/smartcrosshair", curseforgeUrl: "#", websiteUrl: null },
  { id: "aurautility", title: "AuraUtility", desc: "Advanced systems framework and utility belt for client-side rendering optimizations.", tags: ["System", "Core"], githubUrl: "https://github.com/Hardik-Verma", modrinthUrl: "https://modrinth.com/mod/aurautility", curseforgeUrl: "#", websiteUrl: null },
  { id: "blockbrain", title: "BlockBrain", desc: "Advanced AI-driven behavioral toolkit designed to construct complex pathfinding heuristics and procedural logic for voxel entities.", tags: ["Fabric", "AI", "Core"], githubUrl: "https://github.com/Hardik-Verma", modrinthUrl: "#", curseforgeUrl: "#", websiteUrl: "#" },
  { id: "trialstats", title: "TrialStats", desc: "An aggressive statistical engine tracking multi-vector trial performance metrics. Generates precision analytical reports in real-time.", tags: ["Fabric", "Utility"], githubUrl: "https://github.com/Hardik-Verma", modrinthUrl: "#", curseforgeUrl: "#", websiteUrl: "#" }
];

export function ModrinthProjects() {
  const [, setLocation] = useLocation();
  const [activePopup, setActivePopup] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLocation("/");
    setTimeout(() => {
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const closePopup = () => setActivePopup(null);

  return (
    <motion.div
      key="modsView"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full transform-gpu min-h-screen pt-24 sm:pt-32 pb-24 sm:pb-32 px-4 sm:px-8 md:px-16 flex flex-col items-center"
    >
      <div className="w-full max-w-7xl">
        <a href="/#projects" onClick={handleBackToProjects} className="inline-flex items-center gap-2 sm:gap-3 text-white/40 hover:text-[#ff3333] transition-colors font-bold text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-8 sm:mb-12 group cursor-pointer">
          <span className="transform-gpu group-hover:-translate-x-1 transition-transform">&larr;</span> 
          Back to Projects
        </a>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {PROJECT_ARCHIVE.map((project, i) => {
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl border border-white/[0.05] rounded-2xl overflow-hidden hover:-translate-y-2 hover:bg-[#ff3333]/[0.02] hover:border-[#ff3333]/30 transition-all duration-500 transform-gpu cursor-pointer hover:shadow-[0_0_40px_rgba(255,51,51,0.05)]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#ff3333]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-6 sm:p-8 flex-1 flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white/90 group-hover:text-[#ff3333] transition-colors duration-300 pr-2">
                    {project.title}
                  </h3>
                  <div className="relative">
                    <button 
                      onClick={(e) => { e.preventDefault(); setActivePopup(activePopup === project.id ? null : project.id); }}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 p-2 -mr-2"
                    >
                      <svg className="w-5 h-5 text-white/70 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    
                    <AnimatePresence>
                      {activePopup === project.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          className="absolute top-10 right-0 bg-black/90 border border-white/10 rounded-lg shadow-2xl backdrop-blur-xl p-2 w-48 z-50 flex flex-col gap-1"
                        >
                          <div className="flex justify-between items-center mb-1 px-2 pt-2">
                            <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase">
                              Select Platform
                            </span>
                            <button onClick={(e) => { e.preventDefault(); closePopup(); }} className="text-white/40 hover:text-white transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          {project.websiteUrl && (
                            <a href={project.websiteUrl} target="_blank" rel="noreferrer" onClick={closePopup} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-white/80 hover:text-white text-xs font-bold tracking-wider mt-1">
                              <WebsiteIcon className="w-4 h-4" /> Website
                            </a>
                          )}
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={closePopup} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-white/80 hover:text-white text-xs font-bold tracking-wider">
                              <GithubIcon className="w-4 h-4" /> GitHub
                            </a>
                          )}
                          {project.modrinthUrl && (
                            <a href={project.modrinthUrl} target="_blank" rel="noreferrer" onClick={closePopup} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-white/80 hover:text-[#1BD96A] text-xs font-bold tracking-wider">
                              <ModrinthIcon className="w-4 h-4" /> Modrinth
                            </a>
                          )}
                          {project.curseforgeUrl && (
                            <a href={project.curseforgeUrl} target="_blank" rel="noreferrer" onClick={closePopup} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-white/80 hover:text-[#F16436] text-xs font-bold tracking-wider">
                              <CurseForgeIcon className="w-4 h-4" /> CurseForge
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <p className="text-white/40 text-xs sm:text-sm font-light leading-relaxed flex-1 line-clamp-3 group-hover:text-white/60 transition-colors duration-300">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-bold tracking-widest uppercase text-white/40 group-hover:border-[#ff3333]/30 group-hover:text-[#ff3333]/80 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="px-6 sm:px-8 py-4 sm:py-5 border-t border-white/5 flex justify-between items-center bg-black/20 group-hover:bg-white/[0.02] transition-colors duration-500">
                <div className="flex items-center gap-2 sm:gap-4 text-white/30">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors p-2 -ml-2" title="GitHub">
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.websiteUrl && (
                    <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors p-2" title="Website">
                      <WebsiteIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
                
                <div className="flex items-center gap-2 sm:gap-4 text-white/30 group/modrinth">
                  {project.curseforgeUrl && (
                    <a href={project.curseforgeUrl} target="_blank" rel="noreferrer" className="hover:text-[#F16436] transition-colors p-2" title="CurseForge">
                      <CurseForgeIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.modrinthUrl && (
                    <a href={project.modrinthUrl} target="_blank" rel="noreferrer" className="hover:text-[#1BD96A] transition-colors p-2 -mr-2" title="Modrinth">
                      <ModrinthIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
