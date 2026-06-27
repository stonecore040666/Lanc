import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      // ease out
      setProgress(Math.round(pct * pct * (3 - 2 * pct) * 100));
      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 120);
      }
    };

    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0a0a0f] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ backgroundColor: 'rgba(6,182,212,0.15)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Spinning ring */}
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-400"
          style={{ boxShadow: '0 0 16px rgba(6,182,212,0.8)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-purple-500"
          style={{ boxShadow: '0 0 12px rgba(168,85,247,0.6)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-3 h-3 rounded-full bg-cyan-400"
            style={{ boxShadow: '0 0 12px rgba(6,182,212,1)' }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* NOW LOADING */}
      <motion.p
        className="text-xs font-black tracking-[0.4em] text-gray-400 mb-6"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        NOW LOADING
      </motion.p>

      {/* Progress bar */}
      <div className="w-56 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #06b6d4, #a855f7)',
            boxShadow: '0 0 8px rgba(6,182,212,0.8)',
          }}
        />
      </div>
      <p className="text-[10px] font-mono text-gray-600 mt-2">{progress}%</p>
    </motion.div>
  );
}
