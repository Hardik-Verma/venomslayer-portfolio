import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <div className="w-full h-screen bg-[#030303] flex items-center justify-center font-mono text-white selection:bg-white selection:text-[#030303]">
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* Minimalist 404 */}
        <h1 className="text-9xl md:text-[12rem] font-black tracking-tighter text-white mb-6">
          404
        </h1>
        
        <p className="text-sm md:text-base font-light tracking-[0.2em] text-white/50 uppercase mb-12">
          Sector not found.
        </p>

        {/* Premium Action Button */}
        <a 
          href="/" 
          className="group relative px-8 py-3 bg-white text-[#030303] font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300"
        >
          Return to Base
        </a>
      </div>
    </div>
  );
}
