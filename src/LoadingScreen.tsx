import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOG_MESSAGES = [
  '[0.05s] MOUNTING OBSIDIAN VEX PIPELINE...',
  '[0.22s] ALLOCATING 480 WEBP TEXTURE FRAMES...',
  '[0.58s] BINDING GPU SUB-PIXEL SAMPLER...',
  '[1.10s] INITIALIZING LERP INERTIA ENGINE...',
  '[1.65s] COMPILING CUSTOM SHADER MATRICES...',
  '[2.20s] CALIBRATING THREE.JS DREI ENVIRONMENT...',
  '[2.60s] VERIFYING NEURAL CORE TELEMETRY...',
  '[2.80s] INITIALIZATION COMPLETE // ACCESS GRANTED'
];

export function LoadingScreen({ progress }: { progress: number }) {
  const [glitchText, setGlitchText] = useState('VENOMSLAYER_');
  const [logIndex, setLogIndex] = useState(0);

  // Random glitching text character flicker effect
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!_';
    const interval = setInterval(() => {
      // Much more chaotic/crazy glitch effect
      if (Math.random() > 0.2) {
        const text = 'VENOMSLAYER_';
        const glitched = text
          .split('')
          .map((char, i) => {
            if (Math.random() < 0.3) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return char;
          })
          .join('');
        setGlitchText(glitched);
      } else {
        setGlitchText('VENOMSLAYER_');
      }
    }, 50); // Faster

    return () => clearInterval(interval);
  }, []);

  // Log ticker progress
  useEffect(() => {
    const idx = Math.min(
      LOG_MESSAGES.length - 1,
      Math.floor((progress / 100) * LOG_MESSAGES.length)
    );
    setLogIndex(idx);
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center pointer-events-none select-none font-mono overflow-hidden text-white"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: 'blur(20px)',
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* SCANLINES OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-80" />
      
      {/* RETRO GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a15_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />

      {/* AMBIENT CRIMSON CORE GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,#ff2a2a22,transparent_65%)] blur-3xl pointer-events-none animate-pulse z-0" />

      {/* LASER SCANNING BAR */}
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff2a2a] to-transparent shadow-[0_0_15px_#ff2a2a] z-10 pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
      />

      {/* TOP HUD CORNERS */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-30 flex flex-col gap-1 text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">
        <div className="flex items-center gap-2 text-[#ff2a2a] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#ff2a2a] animate-ping"></span>
          <span>SYS.OS // OBSIDIAN_V8</span>
        </div>
        <span>LOC: [0x7F000001]</span>
        <span>SECURITY: CLASSIFIED</span>
      </div>

      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-30 text-right flex flex-col gap-1 text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">
        <span>GPU_ACCEL: <strong className="text-[#1BD96A]">ACTIVE</strong></span>
        <span>CANVAS: <strong className="text-white">480_WEBP_LERP</strong></span>
        <span>LATENCY: <strong className="text-white">0.02ms</strong></span>
      </div>

      {/* MAIN LOGO & CYBERPUNK HUD CENTER */}
      <div className="relative z-30 flex flex-col items-center justify-center px-4 text-center">
        {/* GLITCH TITLE WITH CHROMATIC ABERRATION */}
        <div className="relative mb-8">
          {/* Cyan Shadow Offset */}
          <h1 className="absolute inset-0 text-[12vw] sm:text-[9vw] md:text-[7vw] font-black tracking-tighter uppercase leading-none text-[#00f0ff] opacity-40 translate-x-[2px] translate-y-[-2px] blur-[1px]">
            {glitchText}
          </h1>
          {/* Red Shadow Offset */}
          <h1 className="absolute inset-0 text-[12vw] sm:text-[9vw] md:text-[7vw] font-black tracking-tighter uppercase leading-none text-[#ff2a2a] opacity-60 translate-x-[-2px] translate-y-[2px] blur-[1px]">
            {glitchText}
          </h1>
          {/* Main White/Crimson Text */}
          <h1 className="relative text-[12vw] sm:text-[9vw] md:text-[7vw] font-black tracking-tighter uppercase leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-[#ff2a2a] drop-shadow-[0_0_25px_rgba(255,42,42,0.6)]">
            {glitchText}
          </h1>
        </div>

        {/* ROTATING HUD PROGRESS GAUGE */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center my-4">
          {/* Outer Rotating Dash Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#ff2a2a]/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          />

          {/* Inner Counter Clockwise Ring */}
          <motion.div
            className="absolute inset-2 rounded-full border border-dashed border-white/20"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          />

          {/* Glowing Red Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="42%"
              className="stroke-white/10 fill-none"
              strokeWidth="4"
            />
            <circle
              cx="50%"
              cy="50%"
              r="42%"
              className="stroke-[#ff2a2a] fill-none shadow-[0_0_15px_#ff2a2a]"
              strokeWidth="4"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * progress) / 100}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>

          {/* PERCENTAGE READOUT */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_12px_rgba(255,42,42,0.8)]">
              {progress.toString().padStart(3, '0')}
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#ff2a2a] font-bold uppercase mt-1">
              {progress === 100 ? 'ACCESS GRANTED' : 'SYSTEM LOADING'}
            </span>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="w-64 sm:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden mt-6 border border-white/10 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-[#ff2a2a] to-white shadow-[0_0_20px_#ff2a2a]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* BOTTOM HUD CORNERS & TERMINAL LOG TICKER */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-30 max-w-sm sm:max-w-md">
        <div className="text-[10px] sm:text-xs text-[#ff2a2a] font-bold tracking-widest uppercase mb-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ff2a2a] rounded-full animate-ping"></span>
          TERMINAL TELEMETRY FEED:
        </div>
        <div className="bg-black/70 border border-white/10 rounded-lg p-2.5 sm:p-3 text-[10px] sm:text-xs text-white/70 font-mono tracking-wide backdrop-blur-md shadow-2xl">
          {LOG_MESSAGES[logIndex]}
        </div>
      </div>

      {/* BOTTOM RIGHT EQUALIZER / SOUNDWAVE ANIMATION */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 flex items-end gap-1 h-8">
        {[40, 80, 20, 90, 50, 70, 30, 100, 60, 40].map((h, i) => (
          <motion.div
            key={i}
            className="w-1 bg-[#ff2a2a] rounded-t shadow-[0_0_8px_#ff2a2a]"
            animate={{ height: ['15%', `${h}%`, '20%'] }}
            transition={{
              repeat: Infinity,
              duration: 0.6 + i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
