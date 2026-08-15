export function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[#030303] flex items-center justify-center p-8 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Red Accent Glow */}
      <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,#ff2a2a10,transparent_70%)] blur-3xl pointer-events-none" />
      
      <div className="relative z-10 text-center w-full max-w-2xl">
        <h1 className="text-[150px] md:text-[200px] font-black text-white tracking-tighter mb-4">
          404
        </h1>
        <div className="h-px w-24 bg-[#ff2a2a] mx-auto mb-16" />
        
        <a 
          href="/" 
          className="inline-block px-8 py-3 bg-transparent border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#ff2a2a] hover:border-[#ff2a2a] hover:text-white transition-all duration-300"
        >
          Return to Base
        </a>
      </div>
    </div>
  );
}
