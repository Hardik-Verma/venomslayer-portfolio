export function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-8">
      <div className="text-center w-full max-w-4xl">
        <h1 className="text-[120px] md:text-[200px] font-black leading-[0.8] text-white tracking-tighter mb-4">
          404
        </h1>
        
        <p className="text-xl md:text-3xl font-black text-[#ff2a2a] uppercase tracking-[0.2em] mb-16 border-t border-b border-[#ff2a2a] py-6">
          SECTOR NOT FOUND // SYSTEM FAILURE
        </p>
        
        <a 
          href="/" 
          className="inline-block px-12 py-6 bg-white text-[#030303] font-black text-sm uppercase tracking-[0.3em] hover:bg-[#ff2a2a] hover:text-white transition-all duration-300 border-4 border-white"
        >
          RETURN TO BASE
        </a>
      </div>
    </div>
  );
}
