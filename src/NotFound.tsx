import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden font-['Inter'] selection:bg-red-500 selection:text-white">
      {/* Background Glitch Effects */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <motion.div 
        className="absolute w-full h-1 bg-red-600/30 blur-md z-0 top-1/2 -translate-y-1/2"
        animate={{ opacity: [0, 1, 0], scaleY: [1, 5, 1] }}
        transition={{ repeat: Infinity, duration: 0.15, repeatDelay: 2 }}
      />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Massive 404 Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <h1 className="text-[25vw] md:text-[20vw] font-black tracking-tighter text-white/5 leading-none uppercase">
            404
          </h1>
          <h1 className="text-[25vw] md:text-[20vw] font-black tracking-tighter text-transparent absolute inset-0 leading-none uppercase"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.8)',
                textShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
              }}>
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col items-center"
        >
          <p className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-red-500 mb-4">
            System Failure
          </p>
          <p className="text-sm font-light text-white/50 tracking-widest max-w-md uppercase">
            The spatial coordinates you requested do not exist in this sector.
          </p>

          <a href="/" className="mt-12 group block">
            <div className="relative flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full hover:border-red-500 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
              <span className="relative z-10 text-xs font-bold tracking-[0.3em] uppercase text-white/80 group-hover:text-white transition-colors">
                Return to Base
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
