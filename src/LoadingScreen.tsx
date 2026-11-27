import { useEffect, useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const TOTAL_FRAMES = 480;
const MAX_PARALLEL_IMAGES = 12;
const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 190;
const MIN_LOADING_MS = 5200;
const WATCHDOG_MS = 8000;
const LIQUID_RIDGE =
  'M0 20 C60 20 65 0 125 0 C185 0 190 20 250 20 C310 20 315 40 375 40 C435 40 440 20 500 20 C560 20 565 0 625 0 C685 0 690 20 750 20 C810 20 815 40 875 40 C935 40 940 20 1000 20';

interface LoadingScreenProps {
  onComplete: (images: HTMLImageElement[]) => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const clipId = `venom-liquid-${useId().replace(/:/g, '')}`;
  const wordmarkClipId = `${clipId}-wordmark`;
  const reduceMotion = Boolean(
    useReducedMotion() || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let resolvedFrames = 0;
    let nextFrame = 0;
    let activeImages = 0;
    let documentReady = document.readyState === 'complete';
    let fontsReady = !document.fonts || document.fonts.status === 'loaded';
    let finished = false;
    let cancelled = false;
    let finishTimer: number | undefined;
    let progressTimer: number | undefined;
    const startedAt = performance.now();
    const reduceMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minimumLoadingMs = reduceMotionPreference ? 0 : MIN_LOADING_MS;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    const imageListeners: { image: HTMLImageElement; settle: () => void }[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(watchdog);
      if (progressTimer !== undefined) window.clearInterval(progressTimer);
      setProgress(100);
      finishTimer = window.setTimeout(() => onComplete(images), reduceMotionPreference ? 0 : 800);
    };

    const updateProgress = () => {
      if (finished) return;
      const frameProgress = (resolvedFrames / TOTAL_FRAMES) * 86;
      const documentProgress = documentReady ? 7 : 0;
      const fontsProgress = fontsReady ? 7 : 0;
      const assetProgress = Math.min(100, frameProgress + documentProgress + fontsProgress);
      const elapsedRatio = minimumLoadingMs === 0
        ? 1
        : Math.min(1, (performance.now() - startedAt) / minimumLoadingMs);
      // Ease the wave at both ends, but never let presentation progress outrun settled assets.
      const elapsedProgress = (1 - Math.cos(Math.PI * elapsedRatio)) * 50;
      const next = Math.floor(Math.min(assetProgress, elapsedProgress));

      setProgress((current) => current === next ? current : next);
      if (assetProgress >= 100 && elapsedProgress >= 100) finish();
    };

    const startNextImages = () => {
      if (cancelled) return;

      while (activeImages < MAX_PARALLEL_IMAGES && nextFrame < TOTAL_FRAMES) {
        const frameIndex = nextFrame++;
        const image = new Image();
        let settled = false;
        images[frameIndex] = image;
        activeImages++;

        const settle = () => {
          if (settled) return;
          settled = true;
          activeImages--;
          resolvedFrames++;
          updateProgress();
          startNextImages();
        };

        image.addEventListener('load', settle, { once: true });
        image.addEventListener('error', settle, { once: true });
        image.src = `/webp_frames/frame_${(frameIndex + 1).toString().padStart(4, '0')}.webp`;
        imageListeners.push({ image, settle });
      }
    };

    const onDocumentReady = () => {
      documentReady = true;
      updateProgress();
    };

    if (documentReady) updateProgress();
    else window.addEventListener('load', onDocumentReady, { once: true });

    if (document.fonts && !fontsReady) {
      document.fonts.ready.then(() => {
        fontsReady = true;
        updateProgress();
      });
    } else {
      updateProgress();
    }

    progressTimer = window.setInterval(updateProgress, 40);
    const watchdog = window.setTimeout(finish, WATCHDOG_MS);
    startNextImages();

    return () => {
      const resolvedByWatchdog = finished && resolvedFrames < TOTAL_FRAMES;
      cancelled = !resolvedByWatchdog;
      window.clearTimeout(watchdog);
      if (finishTimer !== undefined) window.clearTimeout(finishTimer);
      if (progressTimer !== undefined) window.clearInterval(progressTimer);
      window.removeEventListener('load', onDocumentReady);

      if (!resolvedByWatchdog) {
        for (const { image, settle } of imageListeners) {
          image.removeEventListener('load', settle);
          image.removeEventListener('error', settle);
          if (!finished) image.removeAttribute('src');
        }
      }
    };
  }, [onComplete]);

  const safeProgress = Math.max(0, Math.min(100, Math.floor(progress)));
  // Start with a visible shallow pool at the wordmark baseline so the wave is
  // apparent from the first frame; the actual settled progress still controls the rise.
  const fillLineY = VIEWBOX_HEIGHT * (1 - safeProgress / 100) - 72;

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
              <rect x="0" y={fillLineY} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT - fillLineY} />
            </clipPath>
            <clipPath id={wordmarkClipId}>
              <text
                className="venom-preloader__base"
                x="50%"
                y="52%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                VenomSlayer
              </text>
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
          <g clipPath={`url(#${wordmarkClipId})`} aria-hidden="true">
            <g transform={`translate(0 ${fillLineY - 20})`}>
              <g className={reduceMotion ? '' : 'venom-preloader__wave-drift'}>
                <path className="venom-preloader__wave-ridge" d={LIQUID_RIDGE} />
                <path
                  className="venom-preloader__wave-ridge"
                  d={LIQUID_RIDGE}
                  transform={`translate(${VIEWBOX_WIDTH} 0)`}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </motion.div>
  );
}
