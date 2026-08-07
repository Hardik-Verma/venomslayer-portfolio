import { motion } from 'framer-motion';

export function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[12vw] md:text-[8vw] font-black tracking-tighter text-white uppercase leading-none mix-blend-difference">
            INITIALIZING
          </span>
        </motion.div>
        
        <div className="mt-8 flex items-end gap-2 text-red-500 font-mono tracking-widest text-xl">
          <span>{Math.floor(progress).toString().padStart(3, '0')}</span>
          <span className="text-sm pb-1 text-red-500/50">%</span>
        </div>

        <div className="mt-4 w-64 h-px bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            style={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
