export function NotFound() {
  return (
    <div className="w-full h-screen bg-[#030303] flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-[120px] md:text-[200px] font-black leading-none text-white mb-8 tracking-tighter">
          404
        </h1>
        <p className="text-sm font-mono text-white/50 uppercase tracking-[0.3em] mb-12">
          Sector not found // System failure
        </p>
        <a 
          href="/" 
          className="inline-block px-10 py-4 bg-white text-[#030303] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#ff2a2a] hover:text-white transition-colors duration-300"
        >
          Return to Base
        </a>
      </div>
    </div>
  );
}
