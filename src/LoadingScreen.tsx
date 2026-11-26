import { useEffect, useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 190;

function liquidClipPath(progress: number, phase: number) {
  const amount = Math.max(0, Math.min(1, progress / 100));
  const line = VIEWBOX_HEIGHT * (1 - amount);
  const amplitude = amount > 0 && amount < 1 ? 3.5 : 0;
  const points: string[] = [];

  for (let x = 0; x <= VIEWBOX_WIDTH; x += 20) {
    const y = line + Math.sin((x / VIEWBOX_WIDTH) * Math.PI * 4 + phase) * amplitude;
    points.push(`${x} ${y.toFixed(2)}`);
  }

  return `M ${points.join(' L ')} L ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT} L 0 ${VIEWBOX_HEIGHT} Z`;
}

export function LoadingScreen({ progress }: { progress: number }) {
  const clipId = `venom-liquid-${useId().replace(/:/g, '')}`;
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    let previousUpdate = 0;

    const animate = (time: number) => {
      if (time - previousUpdate >= 60) {
        setPhase(time / 1000);
        previousUpdate = time;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  const safeProgress = Math.max(0, Math.min(100, Math.floor(progress)));

  return (
    <motion.div
      className="venom-preloader"
      initial={{ opacity: 1, scale: 1 }}
      exit={reduceMotion
        ? { opacity: 0, pointerEvents: 'none', transition: { duration: 0 } }
        : {
            opacity: 0,
            scale: 1.075,
            pointerEvents: 'none',
            transition: { duration: 0.76, ease: [0.22, 1, 0.36, 1] }
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
              <path d={liquidClipPath(safeProgress, reduceMotion ? 0 : phase)} />
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

      <p className="venom-preloader__status">
        loading ... {safeProgress}%
      </p>
    </motion.div>
  );
}
