import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center p-8 overflow-hidden">
      {/* Cinematic Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,#ff2a2a15,transparent_65%)] blur-3xl pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-16 rounded-3xl shadow-2xl">
        <h1 className="text-[120px] md:text-[160px] font-black leading-none text-white tracking-tighter mb-4">
          404
        </h1>
        <p className="text-sm font-mono text-white/50 uppercase tracking-[0.3em] mb-12">
          Sector not found // System failure
        </p>
        <a 
          href="/" 
          className="inline-block px-10 py-4 bg-white/5 hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 border border-white/20"
        >
          Return to Base
        </a>
      </div>
    </div>
  );
}
