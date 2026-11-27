import { useEffect, useId, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 190;

function liquidClipPath(progress: number, phase: number) {
  const amount = Math.max(0, Math.min(1, progress / 100));
  const line = VIEWBOX_HEIGHT * (1 - amount);
  const envelope = Math.max(0, Math.min(1, amount * 8, (1 - amount) * 8));
  const amplitude = 10 * envelope;
  const points: string[] = [];

  for (let x = 0; x <= VIEWBOX_WIDTH; x += 10) {
    const y = line + Math.sin((x / VIEWBOX_WIDTH) * Math.PI * 4 + phase) * amplitude;
    points.push(`${x} ${y.toFixed(2)}`);
  }

  return `M ${points.join(' L ')} L ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT} L 0 ${VIEWBOX_HEIGHT} Z`;
}

export function LoadingScreen({ progress }: { progress: number }) {
  const clipId = `venom-liquid-${useId().replace(/:/g, '')}`;
  const reduceMotion = Boolean(
    useReducedMotion() || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const wavePathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef(progress);
  const safeProgress = Math.max(0, Math.min(100, Math.floor(progress)));

  useEffect(() => {
    progressRef.current = safeProgress;
  }, [safeProgress]);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    let lastPaint = 0;

    const animateWave = (time: number) => {
      // Direct SVG attribute updates avoid React renders on every animation frame.
      if (time - lastPaint >= 32) {
        wavePathRef.current?.setAttribute(
          'd',
          liquidClipPath(progressRef.current, (time / 1000) * 1.2),
        );
        lastPaint = time;
      }
      frame = requestAnimationFrame(animateWave);
    };

    frame = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <motion.div
      className="venom-preloader"
      initial={{ opacity: 1, scale: 1 }}
      exit={reduceMotion
        ? { opacity: 0, pointerEvents: 'none', transition: { duration: 0 } }
        : {
            opacity: 0,
            scale: 1.06,
            pointerEvents: 'none',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
      aria-label="Loading VenomSlayer portfolio"
      aria-live="polite"
    >
      <div className="venom-preloader__wordmark">
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          role="img"
          aria-label="VenomSlayer"
          focusable="false"
        >
          <defs>
            <clipPath id={clipId}>
              <path
                ref={wavePathRef}
                d={liquidClipPath(safeProgress, 0)}
              />
            </clipPath>
          </defs>
          <text
            className="venom-preloader__base"
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            VenomSlayer
          </text>
          <text
            className="venom-preloader__liquid"
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            clipPath={`url(#${clipId})`}
          >
            VenomSlayer
          </text>
        </svg>
      </div>

      <p className="venom-preloader__status">loading ... {safeProgress}%</p>
    </motion.div>
  );
}
