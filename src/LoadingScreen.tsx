import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Letter-by-letter assembly animation
const VENOM = 'VENOM';
const SLAYER = 'SLAYER_';

const LetterReveal = ({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) => (
  <span className={className}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: 0.5,
          delay: delay + i * 0.06,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ display: 'inline-block' }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

export function LoadingScreen({ progress }: { progress: number }) {
  const [phase, setPhase] = useState<'assembling' | 'progress'>('assembling');

  useEffect(() => {
    // After letters assemble (~1.2s), switch to progress phase
    const t = setTimeout(() => setPhase('progress'), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(12px)',
        scale: 1.05,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Red ambient glow behind logo */}
      <div className="absolute w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,#ff333318,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-start leading-none tracking-tighter font-black uppercase">
          <LetterReveal
            text={VENOM}
            delay={0}
            className="text-[18vw] sm:text-[14vw] md:text-[10vw] bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-400 to-zinc-700 leading-[0.88] block"
          />
          <LetterReveal
            text={SLAYER}
            delay={0.15}
            className="text-[18vw] sm:text-[14vw] md:text-[10vw] bg-clip-text text-transparent bg-gradient-to-b from-red-600 via-red-800 to-black leading-[0.88] block"
          />
        </div>

        {/* Progress area */}
        <AnimatePresence>
          {phase === 'progress' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-3 w-48"
            >
              {/* Progress bar */}
              <div className="w-full h-px bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.6)]"
                  style={{ width: `${progress}%` }}
                  transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
                />
              </div>

              {/* Counter */}
              <div className="flex items-baseline gap-1 font-mono text-sm tracking-[0.2em] text-white/40">
                <span className="text-white/70">{Math.floor(progress).toString().padStart(3, '0')}</span>
                <span className="text-xs text-white/20">%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
