import React from 'react';
import { motion } from 'framer-motion';
import { useNav } from '@/lib/navigation';

function BallArt() {
  const colors = ['#06b6d4', '#a855f7', '#f97316', '#ffffff'];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-80"
          style={{
            width: 60 + i * 40,
            height: 60 + i * 40,
            background: `radial-gradient(circle at 35% 35%, white 0%, ${color} 40%, transparent 70%)`,
            boxShadow: `0 0 ${20 + i * 15}px ${color}`,
            top: `${30 + i * 10}%`,
            left: `${40 + i * 8}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7 + i * 0.05, 0.9, 0.7 + i * 0.05] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const accentColor = '#06b6d4';
const glowColor = 'rgba(6,182,212,0.4)';

export function HomePage() {
  const { go } = useNav();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden flex flex-col select-none">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[70%] h-[70%] rounded-full blur-[150px] opacity-25" style={{ background: accentColor }} />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full blur-[120px] opacity-15" style={{ background: accentColor }} />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-8 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <motion.span
            className="font-black text-sm px-3 py-1 rounded-full border"
            style={{
              color: '#fff',
              backgroundColor: '#06b6d4',
              borderColor: '#22d3ee',
              boxShadow: '0 0 12px rgba(6,182,212,0.9), 0 0 30px rgba(6,182,212,0.5)',
            }}
            animate={{
              boxShadow: [
                '0 0 12px rgba(6,182,212,0.9), 0 0 30px rgba(6,182,212,0.5)',
                '0 0 20px rgba(6,182,212,1), 0 0 50px rgba(6,182,212,0.8)',
                '0 0 12px rgba(6,182,212,0.9), 0 0 30px rgba(6,182,212,0.5)',
              ],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            New!
          </motion.span>
          <span className="font-black tracking-[0.2em] text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            lanc project
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
          <span className="text-cyan-400 text-xs font-bold tracking-widest">VERBAL</span>
          <span className="text-white font-mono font-bold text-sm">999,999,999</span>
        </div>
      </div>

      {/* Hero panel */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <div className="relative overflow-hidden" style={{ height: 'clamp(300px, 55vh, 460px)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-slate-950 to-purple-950" />
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
              backgroundSize: '100% 3px',
            }}
          />
          <div className="absolute inset-0"><BallArt /></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end pb-8 pl-8 pr-4 z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
              <div className="flex gap-2 mb-3 flex-wrap">
                {['ガチャ', '運試し', 'コレクション'].map(g => (
                  <span key={g} className="px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-sm border"
                    style={{ color: accentColor, borderColor: accentColor + '60', backgroundColor: accentColor + '18' }}>
                    {g}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-wider leading-none mb-1">パワーボール ガチャ</h1>
              <p className="text-sm font-bold tracking-widest mb-3" style={{ color: accentColor }}>栄光を目指してロールせよ</p>
              <p className="text-gray-300 text-xs sm:text-sm max-w-md leading-relaxed mb-6 hidden sm:block">
                VERBALを使ってレアなパワーボールを引こう。<br />
                ありふれたノーマルボールから、伝説のゴッドボールまで — 運命は勇者に微笑む。
              </p>
              <motion.button
                onClick={() => go('/gacha')}
                className="relative overflow-hidden px-10 py-3 rounded font-black text-sm tracking-widest text-black cursor-pointer"
                style={{ backgroundColor: accentColor }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div className="absolute inset-0 bg-white/30" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.4 }} />
                ▶ スタート
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Card rail */}
        <div className="relative z-10 pb-8 pt-5">
          <div className="flex items-center gap-3 px-8 mb-4">
            <div className="w-0.5 h-4 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
            <span className="text-xs font-bold tracking-[0.25em] text-gray-400">ゲームメニュー</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex gap-4 px-8">
            <motion.button
              onClick={() => go('/gacha')}
              className="relative flex-shrink-0 rounded-lg overflow-hidden cursor-pointer text-left border-2"
              style={{ width: 'clamp(160px, 22vw, 220px)', height: 'clamp(90px, 13vh, 130px)', borderColor: accentColor, boxShadow: `0 0 24px ${glowColor}, 0 0 0 1px ${accentColor}40` }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-slate-950 to-purple-950 opacity-80" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 opacity-60 scale-75"><BallArt /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
              <motion.div
                className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-black"
                style={{ backgroundColor: accentColor }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >✓</motion.div>
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <div className="text-[9px] font-bold tracking-widest mb-0.5" style={{ color: accentColor }}>ガチャ</div>
                <div className="text-xs font-black tracking-wide truncate leading-tight">パワーボール ガチャ</div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
