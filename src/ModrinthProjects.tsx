import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ModrinthIcon } from './ModrinthIcon';
import { Globe, ExternalLink, X } from 'lucide-react';

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

const PROJECT_ARCHIVE = [
  { id: "betterchatheads", title: "BETTER CHAT HEADS (FABRIC)", tags: ["Fabric", "Client"], links: { Modrinth: "https://modrinth.com/mod/betterchatheads-fabric", GitHub: "https://github.com/Hardik-Verma/BetterChatHeads" } },
  { id: "betterhitsounds", title: "BETTER HIT SOUNDS", tags: ["Fabric", "Audio"], links: { Modrinth: "https://modrinth.com/mod/betterhitsounds", CurseForge: "https://www.curseforge.com/minecraft/mc-mods/betterhitsounds", GitHub: "https://github.com/Hardik-Verma/BetterHitSounds" } },
  { id: "blockbrain", title: "BLOCKBRAIN (MINECRAFT AI COMPANION)", tags: ["Fabric", "AI", "Core"], links: { Modrinth: "https://modrinth.com/mod/blockbrain-minecraft-ai-companion", CurseForge: "https://www.curseforge.com/minecraft/mc-mods/blockbrain-ai-companion", GitHub: "https://github.com/Hardik-Verma/blockbrain", Website: "https://blockbrain.great-site.net" } },
  { id: "customgameicon", title: "CUSTOM GAME ICON", tags: ["Fabric", "Client"], links: { Modrinth: "https://modrinth.com/mod/customgameicon", GitHub: "https://github.com/Hardik-Verma/CustomGameIcon" } },
  { id: "macebot", title: "MACEBOT", tags: ["Fabric", "AI", "Combat"], links: { Modrinth: "https://modrinth.com/mod/macebot", GitHub: "https://github.com/katch0420/MaceBot" } },
  { id: "smartcrosshair", title: "SMART CROSSHAIR", tags: ["Fabric", "UI"], links: { Modrinth: "https://modrinth.com/mod/smartcrosshair", GitHub: "https://github.com/Hardik-Verma/SmartCrosshair" } },
  { id: "trialstats", title: "TRIALSTATS", tags: ["Fabric", "Utility"], links: { Modrinth: "https://modrinth.com/mod/trialstats", GitHub: "https://github.com/Hardik-Verma/TrialStats", Website: "https://trialtracker.wuaze.com" } },
  { id: "zyrenauth", title: "ZYRENAUTH", tags: ["Plugin", "Security"], links: { Modrinth: "https://modrinth.com/plugin/zyrenauth", GitHub: "https://github.com/Hardik-Verma/ZyrenAuth" } }
];

export function ModrinthProjects() {
  const [, setLocation] = useLocation();
  const [selectedProject, setSelectedProject] = useState<typeof PROJECT_ARCHIVE[0] | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-screen pt-24 pb-24 px-4 sm:px-8 flex flex-col items-center bg-[#030303] text-white">
      <div className="w-full max-w-3xl">
        <button onClick={() => { setLocation("/"); setTimeout(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 font-mono text-xs uppercase tracking-widest">
          &larr; Back to Base
        </button>

        <div className="flex flex-col gap-2">
          {PROJECT_ARCHIVE.map((project, i) => (
              <motion.button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="w-full flex items-center justify-between p-8 border-2 border-white hover:border-[#ff2a2a] transition-all text-left group"
            >
              <div>
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter group-hover:text-[#ff2a2a]">{project.title}</h3>
                <div className="flex gap-4">
                  {project.tags.map(t => <span key={t} className="text-[10px] font-mono uppercase tracking-widest text-white/50">{t}</span>)}
                </div>
              </div>
              <div className="w-10 h-10 border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ExternalLink className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#030303] z-50" onClick={() => setSelectedProject(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[#030303] border-2 border-white z-50">
              <div className="flex justify-between items-center p-8 border-b-2 border-white">
                <h2 className="text-xs font-black uppercase tracking-widest">{selectedProject.title}</h2>
                <button onClick={() => setSelectedProject(null)}><X className="w-5 h-5" /></button>
              </div>
              <div className="grid grid-cols-1">
                {Object.entries(selectedProject.links).map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-8 border-b-2 border-white hover:bg-white hover:text-black transition-all text-xs font-black uppercase tracking-widest">
                    {name}
                    {name === 'Modrinth' && <ModrinthIcon className="w-4 h-4" />}
                    {name === 'GitHub' && <GithubIcon className="w-4 h-4" />}
                    {name === 'CurseForge' && <CurseForgeIcon className="w-4 h-4" />}
                    {name === 'Website' && <Globe className="w-4 h-4" />}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
