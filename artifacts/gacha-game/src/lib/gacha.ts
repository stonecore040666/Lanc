export type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC' | 'ULTRA';
export type AuraType = 'none' | 'frost' | 'fire' | 'electric' | 'shadow' | 'storm' | 'dragon' | 'phoenix' | 'void' | 'rainbow' | 'celestial';

export interface PowerBall {
  id: string;
  name: string;
  rarity: Rarity;
  probability: number;
  color: string;
  neonColor: string;
  emoji: string;
  aura: AuraType;
  description: string;
}

export const POWER_BALLS: PowerBall[] = [
  // COMMON (45%)
  {
    id: 'normal', name: 'ノーマルボール', rarity: 'COMMON', probability: 28,
    color: '#e5e7eb', neonColor: 'rgba(229,231,235,0.25)',
    emoji: '⚪', aura: 'none', description: '最も一般的な力の球。',
  },
  {
    id: 'iron', name: 'アイアンボール', rarity: 'COMMON', probability: 17,
    color: '#9ca3af', neonColor: 'rgba(156,163,175,0.4)',
    emoji: '⚫', aura: 'none', description: '鋼鉄の意志を宿す球。',
  },

  // UNCOMMON (22%)
  {
    id: 'steel', name: 'スチールボール', rarity: 'UNCOMMON', probability: 13,
    color: '#cbd5e1', neonColor: 'rgba(203,213,225,0.6)',
    emoji: '🔘', aura: 'frost', description: '精鋼の輝きを放つ球。',
  },
  {
    id: 'crystal', name: 'クリスタルボール', rarity: 'UNCOMMON', probability: 9,
    color: '#93c5fd', neonColor: 'rgba(147,197,253,0.7)',
    emoji: '💎', aura: 'frost', description: '透き通った氷晶の球。',
  },

  // RARE (15%)
  {
    id: 'aqua', name: 'アクアボール', rarity: 'RARE', probability: 8,
    color: '#06b6d4', neonColor: 'rgba(6,182,212,0.85)',
    emoji: '🌊', aura: 'frost', description: '深海の力を秘めた球。',
  },
  {
    id: 'ember', name: 'エンバーボール', rarity: 'RARE', probability: 7,
    color: '#fb923c', neonColor: 'rgba(251,146,60,0.8)',
    emoji: '🔶', aura: 'fire', description: '炎の芽生えを宿す球。',
  },

  // EPIC (10%)
  {
    id: 'blaze', name: 'ブレイズボール', rarity: 'EPIC', probability: 4,
    color: '#ef4444', neonColor: 'rgba(239,68,68,0.95)',
    emoji: '🔥', aura: 'fire', description: '業火を纏う灼熱の球。',
  },
  {
    id: 'thunder', name: 'サンダーボール', rarity: 'EPIC', probability: 3.5,
    color: '#facc15', neonColor: 'rgba(250,204,21,0.95)',
    emoji: '⚡', aura: 'electric', description: '天雷の怒りが宿る球。',
  },
  {
    id: 'shadow', name: 'シャドウボール', rarity: 'EPIC', probability: 2.5,
    color: '#a78bfa', neonColor: 'rgba(167,139,250,0.95)',
    emoji: '🌑', aura: 'shadow', description: '虚無の闇が凝縮した球。',
  },

  // LEGENDARY (5%)
  {
    id: 'storm', name: 'ストームボール', rarity: 'LEGENDARY', probability: 2,
    color: '#a855f7', neonColor: 'rgba(168,85,247,1)',
    emoji: '🌀', aura: 'storm', description: '暴風を呼ぶ伝説の球。',
  },
  {
    id: 'dragon', name: 'ドラゴンオーブ', rarity: 'LEGENDARY', probability: 2,
    color: '#4ade80', neonColor: 'rgba(74,222,128,1)',
    emoji: '🐉', aura: 'dragon', description: '古龍の魂が宿る神秘の球。',
  },
  {
    id: 'phoenix', name: 'フェニックスボール', rarity: 'LEGENDARY', probability: 1,
    color: '#fb923c', neonColor: 'rgba(251,146,60,1)',
    emoji: '🦅', aura: 'phoenix', description: '不死鳥の炎で生まれ変わる球。',
  },

  // MYTHIC (2%)
  {
    id: 'nova', name: 'ノヴァボール', rarity: 'MYTHIC', probability: 1,
    color: '#fde047', neonColor: 'rgba(253,224,71,1)',
    emoji: '⭐', aura: 'storm', description: '超新星の爆発から生まれた球。',
  },
  {
    id: 'void_dragon', name: 'ヴォイドドラゴン', rarity: 'MYTHIC', probability: 1,
    color: '#c084fc', neonColor: 'rgba(192,132,252,1)',
    emoji: '🐲', aura: 'void', description: '虚空を統べる幻の龍。',
  },

  // ULTRA (1%)
  {
    id: 'god', name: 'ゴッドボール', rarity: 'ULTRA', probability: 0.5,
    color: '#ffd700', neonColor: 'rgba(255,215,0,1)',
    emoji: '⚡', aura: 'rainbow', description: '神々の頂点ゼウスが宿る究極の球。',
  },
  {
    id: 'celestial_dragon', name: 'セレスティアルドラゴン', rarity: 'ULTRA', probability: 0.5,
    color: '#e0f2fe', neonColor: 'rgba(224,242,254,1)',
    emoji: '🐉', aura: 'celestial', description: '天地を超越した最強の龍。',
  },
];

export function rollGacha(): PowerBall {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const ball of POWER_BALLS) {
    cumulative += ball.probability;
    if (rand <= cumulative) return ball;
  }
  return POWER_BALLS[0];
}

export function rollGachaTen(): PowerBall[] {
  return Array.from({ length: 10 }, rollGacha);
}

export const RARITY_ORDER: Rarity[] = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC', 'ULTRA'];

export const RARITY_COLORS: Record<Rarity, { color: string; glow: string }> = {
  COMMON:    { color: '#9ca3af', glow: 'rgba(156,163,175,0.5)' },
  UNCOMMON:  { color: '#cbd5e1', glow: 'rgba(203,213,225,0.6)' },
  RARE:      { color: '#06b6d4', glow: 'rgba(6,182,212,0.8)'   },
  EPIC:      { color: '#a78bfa', glow: 'rgba(167,139,250,0.9)' },
  LEGENDARY: { color: '#fb923c', glow: 'rgba(251,146,60,1)'    },
  MYTHIC:    { color: '#fde047', glow: 'rgba(253,224,71,1)'    },
  ULTRA:     { color: '#ffffff', glow: 'rgba(255,255,255,1)'   },
};

export function getRarityStyle(rarity: Rarity): Record<string, string> {
  if (rarity === 'ULTRA') return {};
  return {
    color: RARITY_COLORS[rarity].color,
    textShadow: `0 0 8px ${RARITY_COLORS[rarity].glow}`,
  };
}

export function getRarityClassName(rarity: string): string {
  return rarity === 'ULTRA' ? 'ultra-text' : '';
}

export function getBestBall(balls: PowerBall[]): PowerBall {
  return balls.reduce((best, b) =>
    RARITY_ORDER.indexOf(b.rarity) > RARITY_ORDER.indexOf(best.rarity) ? b : best
  );
}
