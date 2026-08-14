import { motion } from 'framer-motion';

export function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center pointer-events-none select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Minimalist Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-sm font-bold tracking-[0.4em] uppercase"
        >
          VenomSlayer
        </motion.div>

        {/* Professional Loading Bar */}
        <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white"
            style={{ width: `${progress}%` }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
