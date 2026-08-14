import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center p-8">
      <div className="text-center">
        {/* Animated Error Code */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[120px] md:text-[200px] font-black leading-none text-white mb-8 tracking-tighter"
        >
          404
        </motion.h1>
        
        <p className="text-sm font-mono text-[#ff2a2a] uppercase tracking-[0.3em] mb-12">
          Sector not found // System failure
        </p>
        
        <a 
          href="/" 
          className="inline-block px-10 py-4 bg-white text-[#030303] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#ff2a2a] hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Return to Base
        </a>
      </div>
    </div>
  );
}
