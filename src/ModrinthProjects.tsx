import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { ModrinthIcon } from './ModrinthIcon';
import { Github, Globe } from 'lucide-react';

const CurseForgeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="currentColor">
    <title>CurseForge</title>
    <path d="M0 0v24h24V0H0zm18.91 16.57c-.24.78-1.25 1.54-2.22 1.83-2.92.88-7.61.2-9.67-2.15-1.42-1.61-1.33-4.04-.42-5.91.43-.88 1.94-3.14 1.94-3.14s-1.34 2.1-1.84 3.01c-.88 1.63-.98 3.55-.17 5.17 1.43 2.87 5.6 3.44 8.67 2.39 1.13-.39 2.13-1.23 2.62-2.31.25-.56.39-1.28.32-1.92-.05-.48-.22-.97-.47-1.38-.28-.46-.7-.88-1.12-1.22-1.54-1.26-3.41-2.19-5.11-3.35-1.07-.73-2.11-1.55-2.98-2.48-.99-1.06-1.74-2.39-1.87-3.83-.16-1.74.52-3.66 1.87-4.83.69-.6 1.55-1.04 2.42-1.26.85-.21 1.82-.22 2.61.12.83.36 1.51 1.05 1.82 1.89.31.86.3 1.84.02 2.7-.27.83-.81 1.56-1.36 2.27 1.35.95 2.81 1.79 4.09 2.82 1.07.87 2.05 1.93 2.49 3.22.45 1.34.42 2.92-.25 4.19z"/>
  </svg>
);

const PROJECT_ARCHIVE = [
  { 
    id: "betterchatheads", 
    title: "BETTER CHAT HEADS (FABRIC)", 
    desc: "A high-performance client-side utility that improves chat readability by rendering player head avatars next to messages.", 
    features: ["Intelligent Skin Sync+: Asynchronously loads skins to prevent lag.", "Advanced Regex Support: Compatible with complex server rank formats and custom prefixes.", "Zero Performance Impact: Designed for high-traffic servers with optimized rendering."],
    tags: ["Fabric", "Client"], 
    links: { Modrinth: "https://modrinth.com/mod/betterchatheads-fabric", GitHub: "https://github.com/Hardik-Verma/BetterChatHeads" }
  },
  { 
    id: "betterhitsounds", 
    title: "BETTER HIT SOUNDS", 
    desc: "A competitive combat audio engine that replaces default sounds with precise acoustic cues for immediate gameplay feedback.", 
    features: ["Dynamic Audio States: Distinct sounds for combos, critical hits, and standard impacts.", "Hot-Reloadable: Audio files can be swapped in real-time without restarting the game.", "Low Latency: Built natively on Fabric to eliminate audio processing delays."],
    tags: ["Fabric", "Audio"], 
    links: { Modrinth: "https://modrinth.com/mod/betterhitsounds", CurseForge: "https://www.curseforge.com/minecraft/mc-mods/betterhitsounds", GitHub: "https://github.com/Hardik-Verma/BetterHitSounds" }
  },
  { 
    id: "blockbrain", 
    title: "BLOCKBRAIN (MINECRAFT AI COMPANION)", 
    desc: "A context-aware AI assistant integrated directly into the Minecraft HUD.", 
    features: ["In-Game Assistance: Answers questions about recipes and mechanics without Alt-Tabbing.", "HUD Integration: Seamlessly blends with the vanilla interface.", "Context Awareness: Understands current game state to provide relevant tips."],
    tags: ["Fabric", "AI", "Core"], 
    links: { Modrinth: "https://modrinth.com/mod/blockbrain-minecraft-ai-companion", CurseForge: "https://www.curseforge.com/minecraft/mc-mods/blockbrain-ai-minecraft-companion", GitHub: "https://github.com/Hardik-Verma/blockbrain", Website: "https://blockbrain.great-site.net" }
  },
  { 
    id: "customgameicon", 
    title: "CUSTOM GAME ICON", 
    desc: "A lightweight customization tool for the Minecraft client window.", 
    features: ["Window Customization: Change the taskbar and window icon to any custom image.", "Player Head Support: Use your own player skin/head as the game icon.", "Simple Commands: Update icons instantly via in-game commands."],
    tags: ["Fabric", "Client"], 
    links: { Modrinth: "https://modrinth.com/mod/customgameicon", GitHub: "https://github.com/Hardik-Verma/CustomGameIcon" }
  },
  { 
    id: "macebot", 
    title: "MACEBOT", 
    desc: "A training utility for the 1.21+ Mace weapon mechanics.", 
    features: ["AI Opponent: Spawns a bot specifically programmed for Mace PvP/PvE duels.", "Skill Training: Practice wind charge timing and smash attacks in a controlled environment.", "Customizable Difficulty: Adjust bot behavior to simulate different combat scenarios."],
    tags: ["Fabric", "AI", "Combat"], 
    links: { Modrinth: "https://modrinth.com/mod/macebot", GitHub: "https://github.com/katch0420/MaceBot" }
  },
  { 
    id: "smartcrosshair", 
    title: "SMART CROSSHAIR", 
    desc: "A visual enhancement mod that provides vital combat information via the crosshair.", 
    features: ["Trajectory Prediction: Visualizes arrow paths and impact points for bows.", "Dynamic Indicators: Crosshair changes shape based on attack cooldown and movement.", "Critical Hit Detector: Changes color when a critical hit is possible (e.g., while falling)."],
    tags: ["Fabric", "UI"], 
    links: { Modrinth: "https://modrinth.com/mod/smartcrosshair", GitHub: "https://github.com/Hardik-Verma/SmartCrosshair" }
  },
  { 
    id: "trialstats", 
    title: "TRIALSTATS", 
    desc: "A session auditing tool for Minecraft Trial Chambers.", 
    features: ["Loot Tracking: Logs items and rewards received from vaults.", "Performance Metrics: Tracks clear times and mob defeat statistics.", "Client-Side Only: Works on multiplayer servers without requiring server-side installation."],
    tags: ["Fabric", "Utility"], 
    links: { Modrinth: "https://modrinth.com/mod/trialstats", GitHub: "https://github.com/Hardik-Verma/TrialStats", Website: "https://trialtracker.wuaze.com" }
  },
  { 
    id: "zyrenauth", 
    title: "ZYRENAUTH", 
    desc: "A comprehensive authentication security plugin for Minecraft servers.", 
    features: ["Reverse Word Captcha: Prevents bot attacks with automated text challenges.", "Graphical 2FA: Supports in-game QR code generation for mobile authenticator apps.", "Void Isolation: Teleports unauthenticated players to a safe void zone to prevent world interaction."],
    tags: ["Plugin", "Security"], 
    links: { Modrinth: "https://modrinth.com/plugin/zyrenauth", GitHub: "https://github.com/Hardik-Verma/ZyrenAuth" }
  }
];

export function ModrinthProjects() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      key="modsView"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-screen pt-24 pb-24 px-4 sm:px-8 flex flex-col items-center"
    >
      <div className="w-full max-w-5xl">
        <a href="/#projects" onClick={(e) => { e.preventDefault(); setLocation("/"); setTimeout(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
           className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 font-mono text-xs uppercase tracking-widest">
          &larr; Back to Base
        </a>

        <div className="grid grid-cols-1 gap-6">
          {PROJECT_ARCHIVE.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all"
            >
              <h3 className="text-xl sm:text-2xl font-black tracking-tighter text-white mb-2">{project.title}</h3>
              <p className="text-white/60 text-sm mb-6 max-w-2xl">{project.desc}</p>
              
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {project.features.map((feat, j) => (
                    <li key={j} className="text-xs text-white/40 leading-relaxed font-light">{feat}</li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                {Object.entries(project.links).map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    {name === 'Modrinth' && <ModrinthIcon className="w-3 h-3" />}
                    {name === 'GitHub' && <Github className="w-3 h-3" />}
                    {name === 'CurseForge' && <CurseForgeIcon className="w-3 h-3" />}
                    {name === 'Website' && <Globe className="w-3 h-3" />}
                    {name}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
