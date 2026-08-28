import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import React, { useState, useCallback } from 'react';
import { MessageSquare } from 'lucide-react';
import { ModrinthIcon } from './ModrinthIcon';
import { BlockIcon } from './BlockIcon';
import { Link, Route, Switch, useLocation } from 'wouter';
import { ModrinthProjects } from './ModrinthProjects';
import { NotFound } from './NotFound';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`transform-gpu ${className}`}
    >
      {text}
    </motion.div>
  );
};

const SectionPagination = ({ current, total, nextId, isLast = false }: { current: string, total: string, nextId: string, isLast?: boolean }) => {
  const [, setLocation] = useLocation();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      setLocation("/");
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      className="absolute bottom-12 left-0 w-full px-8 md:px-16 flex justify-between items-end pointer-events-none transform-gpu"
    >
      <a href={nextId} onClick={(e) => handleSmoothScroll(e, nextId)} className="pointer-events-auto text-xs font-bold tracking-[0.2em] uppercase hover:text-[#ff3333] transition-colors flex items-center gap-2 group text-white/50">
        {isLast ? "Back to top" : "Explore"} 
        <span className="transform-gpu group-hover:translate-x-1 transition-transform">
          {isLast ? "↑" : "->"}
        </span>
      </a>

      <div className="absolute left-1/2 bottom-0 transform-gpu -translate-x-1/2 text-[10px] font-bold tracking-[0.3em] text-white/30">
        <span className="text-white">{current}</span> / {total}
      </div>

      <a href={nextId} onClick={(e) => handleSmoothScroll(e, nextId)} className="pointer-events-auto group block cursor-pointer">
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center transform-gpu group-hover:scale-105 group-hover:border-[#ff3333] transition-all duration-300">
          <svg className="w-5 h-5 text-white/30 group-hover:text-[#ff3333] transform-gpu group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isLast ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            )}
          </svg>
        </div>
      </a>
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <motion.div
      key="mainView"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col z-20"
    >
      {/* HERO SECTION */}
      <section id="home" className="h-screen flex flex-col justify-end relative text-white px-4 sm:px-8 md:px-16 pb-24 sm:pb-32 overflow-hidden">
        {/* Subtitle — top left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="absolute left-4 sm:left-8 md:left-16 top-28 sm:top-32 md:top-1/3 max-w-[240px] sm:max-w-sm transform-gpu"
        >
          <p className="text-[10px] md:text-sm font-medium text-white/50 leading-relaxed tracking-wide">
            Stop building flat pages. We engineer high-performance, cinematic 3D web environments that defy traditional UI constraints.
          </p>
        </motion.div>

        {/* Hero text — pinned to bottom */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
          className="font-black tracking-tighter uppercase leading-none transform-gpu cursor-default w-full"
        >
          {/* Mobile: two stacked lines */}
          <span className="block md:hidden">
            <span className="block text-[23vw] bg-clip-text text-transparent bg-gradient-to-b from-red-700 via-zinc-500 to-black/90 leading-[0.88] pl-1">
              VENOM
            </span>
            <span className="block text-[23vw] bg-clip-text text-transparent bg-gradient-to-b from-red-700 via-zinc-500 to-black/90 leading-[0.88] pl-1">
              SLAYER_
            </span>
          </span>
          {/* Desktop: single line centered */}
          <span className="hidden md:flex justify-center text-[10vw] bg-clip-text text-transparent bg-gradient-to-b from-red-700 via-zinc-500 to-black">
            VenomSlayer_
          </span>
        </motion.h1>

        <SectionPagination current="01" total="04" nextId="#about" />
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="min-h-screen flex items-center relative text-white px-4 sm:px-8 md:px-16 py-24 sm:py-32 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatedText 
            text="Merging cinematic art direction with high-speed WebGL architecture."
            className="text-2xl sm:text-3xl md:text-6xl font-bold tracking-tighter mb-8 sm:mb-16 leading-[1.1] max-w-4xl"
          />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-sm sm:text-base md:text-xl font-light text-white/50 leading-relaxed transform-gpu"
          >
            <p className="text-white/70">
              Traditional static websites fail to capture attention. I bridge the gap between motion design and web engineering—deploying real-time 3D models, dynamic lighting engines, and fluid camera transitions directly into modern web frameworks.
            </p>
            <div>
                <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase mb-8">The Arsenal</h4>
                <div className="flex flex-wrap gap-3 text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/70">
                  {['THREE.JS', 'GLSL / SHADERS', 'GSAP', 'BLENDER / SPLINE', 'REACT', 'FRAMER MOTION'].map(tech => (
                    <span key={tech} className="px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#ff3333] hover:text-[#ff3333] hover:bg-[#ff3333]/10 hover:shadow-[0_0_15px_rgba(255,51,51,0.2)] transition-all duration-300 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
            </div>
          </motion.div>
        </div>
        <SectionPagination current="02" total="04" nextId="#projects" />
      </section>

      {/* PROJECTS SECTION WITH ROUTER LINK */}
      <section id="projects" className="min-h-screen flex flex-col justify-center items-center relative text-white px-4 sm:px-8 md:px-16 py-24 sm:py-32 bg-black/60">
        <div className="mb-16 sm:mb-24 text-center w-full px-2">
          <AnimatedText text="SELECTED WORKS" className="text-[12vw] sm:text-[8vw] md:text-[6vw] font-black tracking-tighter leading-[0.8] uppercase text-white break-words" />
        </div>

        <div className="w-full max-w-7xl relative min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center transform-gpu"
          >
            {/* Distinct Trigger Card as a Link */}
            <Link href="/modrinth-projects">
              <a className="group relative w-full max-w-2xl h-64 sm:h-80 md:h-96 p-6 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-[#ff3333]/40 transition-all duration-700 transform-gpu cursor-pointer hover:shadow-[0_0_80px_rgba(255,51,51,0.15)] hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#ff3333]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#ff3333]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[100px] bg-[#ff3333]/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="relative mb-4 sm:mb-6">
                    <BlockIcon className="w-10 h-10 sm:w-16 sm:h-16 text-white/40 group-hover:text-[#ff3333] group-hover:scale-110 transition-all duration-700 transform-gpu" />
                    <div className="absolute inset-0 bg-[#ff3333]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase text-white/90 mb-3 sm:mb-4 group-hover:text-white group-hover:tracking-tight transition-all duration-700">
                    Minecraft Mods
                  </h3>
                  <div className="flex items-center gap-2 text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase group-hover:text-white/80 transition-colors duration-500">
                    Enter the Archives
                    <span className="transform-gpu group-hover:translate-x-3 transition-transform duration-500">-&gt;</span>
                  </div>
                </div>
              </a>
            </Link>
          </motion.div>
        </div>

        <SectionPagination current="03" total="04" nextId="#contact" />
      </section>
    </motion.div>
  );
};

export function Overlay() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wipe, setWipe] = useState(false);
  const [, setLocation] = useLocation();

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const triggerWipe = useCallback(() => {
    setWipe(true);
    setTimeout(() => setWipe(false), 600);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    triggerWipe();
    if (window.location.pathname !== "/") {
      setLocation("/");
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return;
    }
    setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const copyDiscord = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hnv_videos");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 flex flex-col w-full selection:bg-white selection:text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-[20%] right-8 h-[60%] w-[2px] bg-white/10 z-[9998] pointer-events-none rounded-full overflow-hidden"
      >
        <motion.div 
          className="w-full h-full bg-white rounded-full origin-top"
          style={{ scaleY: scaleX }}
        />
      </motion.div>

      {/* SECTION WIPE FLASH */}
      <AnimatePresence>
        {wipe && (
          <motion.div
            key="wipe"
            className="fixed inset-0 z-[9997] pointer-events-none bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none bg-black/10 z-0"></div>

      {/* NAVBAR (ALWAYS VISIBLE) */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full flex justify-between items-center px-5 sm:px-8 py-5 md:px-16 md:py-10 z-50 text-white transform-gpu bg-gradient-to-b from-black/90 via-black/50 to-transparent"
      >
        {/* Logo */}
        <a href="/#home" onClick={(e) => { handleSmoothScroll(e, '#home'); setMenuOpen(false); }} className="font-black text-[12px] md:text-[14px] tracking-[0.25em] uppercase cursor-pointer group flex items-center">
          <span className="text-white tracking-[0.3em]">VENOM</span>
          <span className="text-[#ff3333] group-hover:drop-shadow-[0_0_10px_rgba(255,51,51,0.8)] transition-all duration-300">SLAYER</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.15em] uppercase text-white/50">
          <a href="/#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="relative group hover:text-white transition-colors cursor-pointer py-1">Intro<span className="absolute bottom-0 left-0 w-0 h-px bg-[#ff3333] group-hover:w-full transition-all duration-300"></span></a>
          <a href="/#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="relative group hover:text-white transition-colors cursor-pointer py-1">Profile<span className="absolute bottom-0 left-0 w-0 h-px bg-[#ff3333] group-hover:w-full transition-all duration-300"></span></a>
          <a href="/#projects" onClick={(e) => handleSmoothScroll(e, '#projects')} className="relative group hover:text-white transition-colors cursor-pointer py-1">Work<span className="absolute bottom-0 left-0 w-0 h-px bg-[#ff3333] group-hover:w-full transition-all duration-300"></span></a>
          {window.location.pathname === "/" && (
            <a href="/#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="relative group hover:text-white transition-colors cursor-pointer py-1">Connect<span className="absolute bottom-0 left-0 w-0 h-px bg-[#ff3333] group-hover:w-full transition-all duration-300"></span></a>
          )}
          <a href="https://review.venomslayer.in" target="_blank" rel="noreferrer" className="relative group text-white hover:text-[#ff3333] transition-colors py-1">Leave a Review<span className="absolute bottom-0 left-0 w-0 h-px bg-[#ff3333] group-hover:w-full transition-all duration-300"></span></a>
        </div>

        {/* Hamburger Button — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] z-[60] relative"
          aria-label="Toggle Menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block w-7 h-[2px] bg-white origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-[2px] bg-[#ff3333] origin-center self-start"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block w-7 h-[2px] bg-white origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-start px-8 md:hidden"
          >
            {/* Decorative red line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff3333] to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff3333]/30 to-transparent" />

            <nav className="flex flex-col gap-2 w-full">
              {[
                { label: 'Intro', id: '#home' },
                { label: 'Profile', id: '#about' },
                { label: 'Work', id: '#projects' },
                { label: 'Connect', id: '#contact' },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.id}
                  onClick={(e) => { handleSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>, item.id); setMenuOpen(false); }}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between py-5 border-b border-white/5 cursor-pointer"
                >
                  <span className="text-4xl font-black tracking-tighter uppercase text-white/80 group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="text-[#ff3333] text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </motion.a>
              ))}
              <motion.a
                href="https://review.venomslayer.in"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, delay: 4 * 0.07 }}
                className="group flex items-center justify-between py-5 border-b border-white/5"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-3xl sm:text-4xl font-black tracking-tighter uppercase text-[#ff3333]/80 group-hover:text-[#ff3333] transition-colors duration-300">Leave a Review</span>
                <span className="text-[#ff3333] text-2xl group-hover:translate-x-2 transition-transform duration-300">↗</span>
              </motion.a>
            </nav>

            <p className="mt-12 text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">VENOMSLAYER © 2026</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WOUTER SWITCH AREA */}
      <div className="w-full flex flex-col z-20">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/modrinth-projects" component={ModrinthProjects} />
          <Route component={NotFound} />
        </Switch>

        {/* FOOTER (ONLY ON HOME) */}
        {window.location.pathname === "/" && (
          <section id="contact" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 py-24 sm:py-32 bg-black/90 text-white relative overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_100%,#ff333315,transparent)] pointer-events-none"></div>
            
            <div className="flex flex-col items-center justify-center flex-1 text-center w-full mt-16 sm:mt-0 relative z-10">
              <a href="mailto:hardikverma1902@gmail.com" className="group block w-full">
                <AnimatedText text="LET'S CONNECT" className="text-[14vw] sm:text-[12vw] md:text-[8vw] font-black tracking-tighter leading-none uppercase text-white/80 group-hover:text-white transition-colors duration-500 break-words" />
                <div className="h-1 w-0 group-hover:w-full bg-[#ff3333] transition-all duration-700 ease-[0.16,1,0.3,1] mx-auto mt-6 sm:mt-8 shadow-[0_0_20px_rgba(255,51,51,0.5)]"></div>
              </a>
              
              <a 
                href="https://review.venomslayer.in" 
                target="_blank"
                className="mt-12 sm:mt-16 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 bg-white/5 text-white/70 font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs hover:bg-[#ff3333]/10 hover:text-white hover:border-[#ff3333] hover:shadow-[0_0_30px_rgba(255,51,51,0.2)] transition-all duration-300 transform-gpu inline-block text-center max-w-[80vw]"
              >
                Used our services? Leave a review
              </a>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end border-t border-white/10 pt-6 sm:pt-8 mt-auto gap-6 sm:gap-8 md:gap-0 pb-12 sm:pb-16 md:pb-8">
              <div className="text-[8px] sm:text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase text-center md:text-left">
                © {new Date().getFullYear()} VenomSlayer
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/40">
                <a href="https://github.com/Hardik-Verma/" target="_blank" className="relative group flex items-center gap-2 hover:text-white transition-colors py-1">
                  <GithubIcon className="w-4 h-4 group-hover:text-[#ff3333] transition-colors" /> GitHub
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#ff3333] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="https://modrinth.com/user/_Pheonix" target="_blank" className="relative group flex items-center gap-2 hover:text-white transition-colors py-1">
                  <ModrinthIcon className="w-4 h-4 group-hover:text-[#1BD96A] transition-colors" /> Modrinth
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1BD96A] group-hover:w-full transition-all duration-300"></span>
                </a>
                <div className="relative flex flex-col justify-center">
                  <button onClick={copyDiscord} className="relative group flex items-center gap-2 hover:text-white transition-colors focus:outline-none py-1">
                    <MessageSquare className="w-4 h-4 group-hover:text-[#5865F2] transition-colors" /> Discord
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#5865F2] group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <AnimatePresence>
                    {copied && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#5865F2] text-white px-3 py-1 rounded text-[8px] tracking-widest whitespace-nowrap transform-gpu shadow-[0_0_15px_rgba(88,101,242,0.5)]"
                      >
                        COPIED!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <a href="https://x.com/HardikV07715758" target="_blank" className="relative group flex items-center gap-2 hover:text-white transition-colors py-1">
                  <TwitterIcon className="w-4 h-4 group-hover:text-[#1DA1F2] transition-colors" /> Twitter
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1DA1F2] group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
