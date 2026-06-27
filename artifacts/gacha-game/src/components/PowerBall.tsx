import React from 'react';
import { PowerBall as PowerBallType, AuraType } from '@/lib/gacha';

interface PowerBallProps {
  ball: PowerBallType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const SIZE_PX: Record<string, number> = { sm: 48, md: 96, lg: 192, xl: 256 };
const sizeClasses: Record<string, string> = {
  sm: 'w-12 h-12', md: 'w-24 h-24', lg: 'w-48 h-48', xl: 'w-64 h-64',
};
const emojiSizeClasses: Record<string, string> = {
  sm: 'text-lg', md: 'text-3xl', lg: 'text-6xl', xl: 'text-8xl',
};

interface RingDef {
  color: string; extra: number; spinDur: number; dir: 1 | -1;
  opacity: number; dash?: boolean; width?: number; glow?: number;
}

function getAuraRings(aura: AuraType, scale: number): RingDef[] {
  const s = (v: number) => Math.round(v * scale);
  switch (aura) {
    case 'frost':    return [
      { color: '#93c5fd', extra: s(9),  spinDur: 9,  dir:  1, opacity: 0.75, width: 2 },
      { color: '#bfdbfe', extra: s(20), spinDur: 15, dir: -1, opacity: 0.4,  dash: true },
    ];
    case 'fire':     return [
      { color: '#f97316', extra: s(9),  spinDur: 3,  dir:  1, opacity: 0.95, width: 3, glow: 8 },
      { color: '#ef4444', extra: s(20), spinDur: 5,  dir: -1, opacity: 0.65, glow: 6 },
    ];
    case 'electric': return [
      { color: '#facc15', extra: s(7),  spinDur: 1.5, dir:  1, opacity: 1,   width: 3, glow: 10 },
      { color: '#fde047', extra: s(18), spinDur: 2.5, dir: -1, opacity: 0.5, dash: true },
    ];
    case 'shadow':   return [
      { color: '#7c3aed', extra: s(10), spinDur: 7,  dir: -1, opacity: 0.85, width: 3, glow: 8 },
      { color: '#4c1d95', extra: s(24), spinDur: 13, dir:  1, opacity: 0.45, dash: true },
    ];
    case 'storm':    return [
      { color: '#a855f7', extra: s(9),  spinDur: 4,  dir:  1, opacity: 0.95, width: 3, glow: 10 },
      { color: '#e9d5ff', extra: s(20), spinDur: 7,  dir: -1, opacity: 0.6,  dash: true },
      { color: '#7c3aed', extra: s(34), spinDur: 11, dir:  1, opacity: 0.3 },
    ];
    case 'dragon':   return [
      { color: '#22c55e', extra: s(9),  spinDur: 5,  dir:  1, opacity: 0.95, width: 3, glow: 10 },
      { color: '#fbbf24', extra: s(22), spinDur: 9,  dir: -1, opacity: 0.75, width: 3, glow: 8 },
      { color: '#16a34a', extra: s(38), spinDur: 14, dir:  1, opacity: 0.35, dash: true },
    ];
    case 'phoenix':  return [
      { color: '#fb923c', extra: s(9),  spinDur: 3,  dir:  1, opacity: 1,   width: 3, glow: 12 },
      { color: '#ef4444', extra: s(21), spinDur: 5,  dir: -1, opacity: 0.75, width: 2, glow: 8 },
      { color: '#fcd34d', extra: s(36), spinDur: 9,  dir:  1, opacity: 0.4 },
    ];
    case 'void':     return [
      { color: '#7c3aed', extra: s(9),  spinDur: 4,  dir: -1, opacity: 1,   width: 3, glow: 12 },
      { color: '#c026d3', extra: s(20), spinDur: 6,  dir:  1, opacity: 0.75, width: 2, glow: 8 },
      { color: '#0891b2', extra: s(34), spinDur: 11, dir: -1, opacity: 0.45, dash: true },
      { color: '#6d28d9', extra: s(50), spinDur: 16, dir:  1, opacity: 0.2 },
    ];
    case 'rainbow':  return [
      { color: '#ff0080', extra: s(9),  spinDur: 2,  dir:  1, opacity: 0.9, width: 3, glow: 12 },
      { color: '#00ff80', extra: s(22), spinDur: 3,  dir: -1, opacity: 0.7, width: 2 },
      { color: '#0080ff', extra: s(38), spinDur: 4,  dir:  1, opacity: 0.5 },
    ];
    case 'celestial': return [
      { color: '#fde047', extra: s(9),  spinDur: 4,  dir:  1, opacity: 1,   width: 3, glow: 14 },
      { color: '#ffffff', extra: s(20), spinDur: 7,  dir: -1, opacity: 0.85, width: 2, glow: 8 },
      { color: '#fbbf24', extra: s(34), spinDur: 11, dir:  1, opacity: 0.5,  dash: true },
      { color: '#e0f2fe', extra: s(50), spinDur: 16, dir: -1, opacity: 0.25 },
    ];
    default: return [];
  }
}

function getBallGradient(ball: PowerBallType): string {
  if (ball.id === 'god') {
    return 'radial-gradient(circle at 28% 22%, #fffde7 0%, #ffe566 20%, #ffd700 45%, #b8860b 75%, #6b4c00 100%)';
  }
  if (ball.id === 'celestial_dragon') {
    return 'radial-gradient(circle at 28% 22%, #ffffff 0%, #e0f2fe 20%, #7dd3fc 45%, #0284c7 75%, #01508a 100%)';
  }
  if (ball.rarity === 'ULTRA') {
    return 'radial-gradient(circle at 28% 22%, #fff 0%, #fce7f3 30%, #c4b5fd 60%, #3730a3 100%)';
  }
  const c = ball.color;
  return `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35) 0%, ${c} 50%, color-mix(in srgb, ${c} 80%, black) 100%)`;
}

function getBallShadow(ball: PowerBallType): string {
  if (ball.id === 'god') {
    return '0 0 40px #ffd700, 0 0 80px #ffa500, 0 0 120px #ff8c00aa, inset 0 0 40px rgba(255,255,200,0.6)';
  }
  if (ball.id === 'celestial_dragon') {
    return '0 0 40px #38bdf8, 0 0 80px #0ea5e9, 0 0 120px #0284c7aa, inset 0 0 40px rgba(186,230,253,0.5)';
  }
  if (ball.neonColor === 'rainbow') {
    return '0 0 20px #ff0000, 0 0 40px #ff7f00, 0 0 60px #00ff00, 0 0 80px #0000ff';
  }
  return `0 0 20px ${ball.neonColor}, 0 0 40px ${ball.neonColor}, inset 0 0 20px ${ball.neonColor}`;
}

/* ── Pure-CSS Orbiter — no Framer Motion, no teleport ───────────────────
   Uses negative animation-delay to place each orbiter at its start angle.
   startDeg=0 → delay=0; startDeg=120, dur=3s → delay=−1s (already 1/3 done)
*/
function Orbiter({
  startDeg, duration, dir = 1, orbitR, children,
}: {
  startDeg: number; duration: number; dir?: 1 | -1; orbitR: number;
  children: React.ReactNode;
}) {
  const delay = -(startDeg / 360) * duration;
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        transformOrigin: 'center center',
        animation: `${dir === -1 ? 'pb-spin-ccw' : 'pb-spin-cw'} ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        willChange: 'transform',
      }}
    >
      <div style={{
        position: 'absolute',
        top: `calc(50% - ${orbitR}px)`,
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── GOD BALL (Zeus) — all CSS, zero Framer Motion ──────────────────────── */
function GodBallEffects({ px }: { px: number }) {
  const r1 = px * 0.82;
  const r2 = px * 1.08;
  const boltSize    = Math.max(12, px * 0.28);
  const boltSizeSm  = Math.max(9,  px * 0.2);

  return (
    <>
      {/* Blurry energy field */}
      <div className="absolute rounded-full pointer-events-none" style={{
        inset: -Math.round(px * 0.85),
        background: 'radial-gradient(circle, rgba(255,215,0,0.22) 0%, rgba(255,140,0,0.1) 50%, transparent 75%)',
        filter: `blur(${Math.round(px * 0.22)}px)`,
      }} />

      {/* Rotating crown of rays */}
      <div className="absolute rounded-full pointer-events-none" style={{
        inset: -Math.round(px * 0.55),
        background:
          'conic-gradient(from 0deg,' +
          'transparent 0deg, rgba(255,220,0,0.65) 4deg, transparent 10deg,' +
          'transparent 28deg, rgba(255,170,0,0.45) 33deg, transparent 39deg,' +
          'transparent 58deg, rgba(255,220,0,0.55) 62deg, transparent 68deg,' +
          'transparent 88deg, rgba(255,200,0,0.40) 92deg, transparent 98deg,' +
          'transparent 118deg,rgba(255,220,0,0.65)123deg, transparent 129deg,' +
          'transparent 148deg,rgba(255,170,0,0.45)153deg, transparent 159deg,' +
          'transparent 178deg,rgba(255,220,0,0.55)182deg, transparent 188deg,' +
          'transparent 208deg,rgba(255,200,0,0.40)212deg, transparent 218deg,' +
          'transparent 238deg,rgba(255,220,0,0.65)242deg, transparent 248deg,' +
          'transparent 268deg,rgba(255,170,0,0.45)273deg, transparent 279deg,' +
          'transparent 298deg,rgba(255,220,0,0.55)302deg, transparent 308deg,' +
          'transparent 328deg,rgba(255,200,0,0.40)332deg, transparent 338deg)',
        animation: 'pb-spin-cw 10s linear infinite',
        willChange: 'transform',
      }} />

      {/* Counter-rotating inner fire ring */}
      <div className="absolute rounded-full pointer-events-none" style={{
        inset: -Math.round(px * 0.35),
        background: 'conic-gradient(from 0deg, rgba(255,80,0,0.7), rgba(255,200,0,0.8), rgba(255,50,0,0.6), rgba(255,180,0,0.9), rgba(255,80,0,0.7))',
        filter: `blur(${Math.round(px * 0.07)}px)`,
        opacity: 0.6,
        animation: 'pb-spin-ccw 4s linear infinite',
        willChange: 'transform',
      }} />

      {/* Pulsing outer electric ring */}
      <div className="absolute rounded-full pointer-events-none" style={{
        inset: -Math.round(px * 0.38),
        border: `${Math.max(2, Math.round(px * 0.04))}px solid rgba(255,215,0,0.85)`,
        boxShadow: '0 0 20px rgba(255,215,0,0.9), 0 0 50px rgba(255,140,0,0.5)',
        animation: 'pb-pulse-ring 1.4s ease-in-out infinite',
        willChange: 'transform, opacity',
      }} />

      {/* Tight inner ring */}
      <div className="absolute rounded-full pointer-events-none" style={{
        inset: -Math.round(px * 0.16),
        border: `${Math.max(1, Math.round(px * 0.025))}px solid rgba(255,255,180,1)`,
        boxShadow: '0 0 12px rgba(255,255,180,1), 0 0 24px rgba(255,215,0,0.7)',
        animation: 'pb-pulse-ring 0.7s ease-in-out infinite',
        animationDelay: '-0.35s',
        willChange: 'transform, opacity',
      }} />

      {/* Inner orbit ⚡ × 3 */}
      {([0, 120, 240] as const).map((deg, i) => (
        <Orbiter key={`bi${i}`} startDeg={deg} duration={3} orbitR={r1}>
          <span style={{ fontSize: `${boltSize}px`, filter: 'drop-shadow(0 0 8px #ffd700) drop-shadow(0 0 18px #ff8c00)', lineHeight: 1, display: 'block' }}>⚡</span>
        </Orbiter>
      ))}

      {/* Outer orbit ⚡ × 3 */}
      {([60, 180, 300] as const).map((deg, i) => (
        <Orbiter key={`bo${i}`} startDeg={deg} duration={5} orbitR={r2}>
          <span style={{ fontSize: `${boltSizeSm}px`, filter: 'drop-shadow(0 0 6px #fff) drop-shadow(0 0 14px #ffd700)', lineHeight: 1, display: 'block' }}>⚡</span>
        </Orbiter>
      ))}
    </>
  );
}

/* ── CELESTIAL DRAGON — CSS 3D orbit, no Framer Motion ─────────────────── */
function CelestialDragonEffects({ px }: { px: number }) {
  const dragonSize   = Math.max(16, px * 0.40);
  const dragonSizeSm = Math.max(11, px * 0.28);
  const starSize     = Math.max(7,  px * 0.11);
  const orbitZ       = px * 0.78;
  const orbitZSm     = px * 0.62;
  const outerR       = px * 1.05;

  return (
    <>
      {/* Blurry energy field */}
      <div className="absolute rounded-full pointer-events-none" style={{
        inset: -Math.round(px * 0.85),
        background: 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(14,165,233,0.1) 50%, transparent 75%)',
        filter: `blur(${Math.round(px * 0.22)}px)`,
      }} />

      {/* Aurora outer glow */}
      <div className="absolute rounded-full pointer-events-none" style={{
        inset: -Math.round(px * 0.55),
        background: 'conic-gradient(from 0deg, rgba(125,211,252,0.5), rgba(251,191,36,0.4), rgba(167,243,208,0.3), rgba(125,211,252,0.5), rgba(251,191,36,0.4), transparent)',
        filter: `blur(${Math.round(px * 0.06)}px)`,
        opacity: 0.7,
        animation: 'pb-spin-cw 7s linear infinite',
        willChange: 'transform',
      }} />

      {/* Counter aurora */}
      <div className="absolute rounded-full pointer-events-none" style={{
        inset: -Math.round(px * 0.42),
        background: 'conic-gradient(from 180deg, transparent, rgba(186,230,253,0.45), transparent, rgba(253,224,71,0.3), transparent)',
        filter: `blur(${Math.round(px * 0.05)}px)`,
        opacity: 0.65,
        animation: 'pb-spin-ccw 5s linear infinite',
        willChange: 'transform',
      }} />

      {/* Pulsing celestial ring */}
      <div className="absolute rounded-full pointer-events-none" style={{
        inset: -Math.round(px * 0.38),
        border: `${Math.max(2, Math.round(px * 0.04))}px solid rgba(125,211,252,0.85)`,
        boxShadow: '0 0 20px rgba(56,189,248,0.9), 0 0 50px rgba(14,165,233,0.5)',
        animation: 'pb-pulse-ring 1.8s ease-in-out infinite',
        willChange: 'transform, opacity',
      }} />

      {/* ✦ Orbiting star particles */}
      {([0, 72, 144, 216, 288] as const).map((deg, i) => (
        <Orbiter key={`star${i}`} startDeg={deg} duration={10 + i * 1.2} orbitR={outerR}>
          <span style={{ fontSize: `${starSize}px`, filter: 'drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px #7dd3fc)', lineHeight: 1, display: 'block' }}>✦</span>
        </Orbiter>
      ))}

      {/* PRIMARY 3-D dragon orbit — pure CSS rotateY */}
      <div className="absolute pointer-events-none" style={{
        inset: -Math.round(px * 0.8),
        perspective: `${px * 4}px`,
        perspectiveOrigin: 'center center',
      }}>
        <div style={{
          width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative',
          animation: 'pb-orbit-3d-cw 5s linear infinite',
          willChange: 'transform',
        }}>
          <span style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: `translate(-50%, -50%) translateZ(${orbitZ}px)`,
            fontSize: `${dragonSize}px`,
            filter: 'drop-shadow(0 0 12px #fbbf24) drop-shadow(0 0 24px #7dd3fc)',
            lineHeight: 1, display: 'block',
          }}>🐉</span>
        </div>
      </div>

      {/* SECONDARY dragon — different tilt, opposite direction, starts at 180° */}
      <div className="absolute pointer-events-none" style={{
        inset: -Math.round(px * 0.7),
        perspective: `${px * 3.5}px`,
        perspectiveOrigin: 'center center',
        transform: 'rotateX(55deg)',
      }}>
        <div style={{
          width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative',
          animation: 'pb-orbit-3d-ccw 7s linear infinite',
          animationDelay: '-3.5s', /* starts at 180° = half duration */
          willChange: 'transform',
        }}>
          <span style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: `translate(-50%, -50%) translateZ(${orbitZSm}px)`,
            fontSize: `${dragonSizeSm}px`,
            filter: 'drop-shadow(0 0 8px #e0f2fe) drop-shadow(0 0 18px #fde047)',
            lineHeight: 1, display: 'block',
          }}>🐉</span>
        </div>
      </div>
    </>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export function PowerBallComponent({ ball, size = 'md', animated = false }: PowerBallProps) {
  const px    = SIZE_PX[size];
  const scale = px / 96;
  const rings = animated ? getAuraRings(ball.aura, scale) : [];
  const isUltra          = ball.rarity === 'ULTRA';
  const isGod            = ball.id === 'god';
  const isCelestialDragon = ball.id === 'celestial_dragon';
  const showPulse        = animated && !['COMMON', 'UNCOMMON'].includes(ball.rarity);

  /* Ball sphere animation class (CSS keyframes) */
  const ballAnimClass = animated
    ? isGod             ? 'pb-ball-anim-god'
    : isCelestialDragon ? 'pb-ball-anim-celestial'
    : isUltra           ? 'pb-ball-anim-ultra'
    : 'pb-ball-anim-neon'
    : '';

  return (
    <div
      className={`relative ${sizeClasses[size]} flex items-center justify-center flex-shrink-0`}
      style={{ overflow: 'visible' }}
    >
      {/* Standard aura rings — CSS spin, no Framer Motion */}
      {!isGod && !isCelestialDragon && rings.map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -ring.extra,
            border: `${ring.width ?? 2}px ${ring.dash ? 'dashed' : 'solid'} ${ring.color}`,
            opacity: ring.opacity,
            boxShadow: ring.glow ? `0 0 ${ring.glow}px ${ring.color}` : undefined,
            animation: `${ring.dir === 1 ? 'pb-spin-cw' : 'pb-spin-ccw'} ${ring.spinDur}s linear infinite`,
            willChange: 'transform',
          }}
        />
      ))}

      {/* ULTRA generic conic glow */}
      {isUltra && !isGod && !isCelestialDragon && animated && (
        <div className="absolute rounded-full pointer-events-none" style={{
          inset: -(Math.round(55 * scale)),
          background: 'conic-gradient(from 0deg, #ff0080, #ff8000, #ffff00, #00ff80, #00ffff, #0080ff, #8000ff, #ff0080)',
          filter: `blur(${Math.round(8 * scale)}px)`,
          opacity: 0.35,
          animation: 'pb-spin-cw 4s linear infinite',
          willChange: 'transform',
        }} />
      )}

      {/* Special ULTRA effects */}
      {isGod            && animated && <GodBallEffects px={px} />}
      {isCelestialDragon && animated && <CelestialDragonEffects px={px} />}

      {/* ── Ball sphere ── */}
      <div
        className={`${sizeClasses[size]} ${ballAnimClass} rounded-full flex items-center justify-center relative overflow-hidden flex-shrink-0`}
        style={{
          background: getBallGradient(ball),
          boxShadow: getBallShadow(ball),
          '--pb-neon': ball.neonColor,
          willChange: animated ? 'transform, box-shadow' : undefined,
        } as React.CSSProperties}
      >
        {/* Specular highlight */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(circle at 32% 25%, rgba(255,255,255,0.65) 0%, transparent 50%)',
        }} />
        {/* Bottom depth shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 rounded-b-full" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.38), transparent)',
        }} />
        {/* Side rim for 3-D feel */}
        <div className="absolute inset-0 rounded-full" style={{
          boxShadow: 'inset -4px -4px 12px rgba(0,0,0,0.35), inset 2px 2px 8px rgba(255,255,255,0.15)',
        }} />

        {/* God interior flicker */}
        {isGod && animated && (
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle, rgba(255,255,200,0.55) 0%, transparent 65%)',
            animation: 'pb-flicker 1.1s ease-in-out infinite',
          }} />
        )}

        {/* Celestial dragon interior aurora */}
        {isCelestialDragon && animated && (
          <div className="absolute inset-0 rounded-full" style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(125,211,252,0.4), transparent, rgba(251,191,36,0.28), transparent)',
            animation: 'pb-spin-cw 2.5s linear infinite',
            willChange: 'transform',
          }} />
        )}

        {/* Emoji */}
        <span
          className={`relative z-10 select-none pointer-events-none leading-none ${emojiSizeClasses[size]}`}
          style={{
            filter: isGod
              ? 'drop-shadow(0 0 10px #ffd700) drop-shadow(0 0 20px #fff)'
              : isCelestialDragon
              ? 'drop-shadow(0 0 10px #7dd3fc) drop-shadow(0 0 20px #fbbf24)'
              : 'drop-shadow(0 0 4px rgba(255,255,255,0.7))',
          }}
        >
          {ball.emoji}
        </span>

        {/* Pulse ring (expand-fade) — CSS, no Framer Motion */}
        {showPulse && (
          <div className="absolute inset-0 border-2 border-white/60 rounded-full" style={{
            animation: 'pb-expand-fade 1.4s ease-out infinite',
          }} />
        )}

        {/* Aura inner effects — all CSS */}
        {animated && ball.aura === 'electric' && (
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle, rgba(250,204,21,0.3) 0%, transparent 70%)',
            animation: 'pb-electric 0.4s ease-in-out infinite',
          }} />
        )}
        {animated && (ball.aura === 'fire' || ball.aura === 'phoenix') && (
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)',
            animation: 'pb-fire 0.7s ease-in-out infinite',
          }} />
        )}
        {animated && ball.aura === 'dragon' && (
          <div className="absolute inset-0 rounded-full" style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(74,222,128,0.2), transparent, rgba(251,191,36,0.2), transparent)',
            animation: 'pb-spin-cw 3s linear infinite',
            willChange: 'transform',
          }} />
        )}
        {animated && ball.aura === 'void' && (
          <div className="absolute inset-0 rounded-full" style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(192,132,252,0.3), transparent, rgba(8,145,178,0.3), transparent)',
            animation: 'pb-spin-ccw 4s linear infinite',
            willChange: 'transform',
          }} />
        )}
      </div>
    </div>
  );
}
