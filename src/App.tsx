import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Overlay } from './Overlay';
import { LoadingScreen } from './LoadingScreen';
import './index.css';

const TOTAL_FRAMES = 480;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollRef = useRef({ current: 0, target: 0 });
  const requestRef = useRef<number | undefined>(undefined);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(4, '0');
      img.src = `/webp_frames/frame_${paddedIndex}.webp`;
      
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
    
    return () => {
      imagesRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) { 
          ctx.imageSmoothingEnabled = true; 
          ctx.imageSmoothingQuality = 'high'; 
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) maxScroll = 1;
      
      scrollRef.current.target = Math.max(0, Math.min(1, currentScroll / maxScroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);

    let lastDrawnIndex = -1;

    const renderLoop = () => {
      const state = scrollRef.current;
      const diff = state.target - state.current;
      
      if (Math.abs(diff) > 0.0001) {
        state.current += diff * 0.08;
      } else {
        state.current = state.target;
      }
      
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(state.current * TOTAL_FRAMES));
      
      if (frameIndex !== lastDrawnIndex && imagesRef.current[frameIndex]) {
        const canvas = canvasRef.current;
        const img = imagesRef.current[frameIndex];
        
        if (canvas && img && img.complete && img.naturalWidth !== 0) {
          const ctx = canvas.getContext('2d', { alpha: false });
          if (ctx) {
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
              drawHeight = canvas.width / imgRatio;
              offsetY = (canvas.height - drawHeight) / 2;
            } else {
              drawWidth = canvas.height * imgRatio;
              offsetX = (canvas.width - drawWidth) / 2;
            }
            
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            lastDrawnIndex = frameIndex;
          }
        }
      }
      
      requestRef.current = requestAnimationFrame(renderLoop);
    };

    requestRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isLoaded]);

  return (
    <div className="relative w-full min-h-screen bg-black">
      <AnimatePresence>
        {!isLoaded && <LoadingScreen progress={loadProgress} />}
      </AnimatePresence>

      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none transform-gpu animate-idle-breathe"
      />

      <div className="fixed inset-0 z-[5] pointer-events-none transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]"></div>
        <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {isLoaded && <Overlay />}
    </div>
  );
}
