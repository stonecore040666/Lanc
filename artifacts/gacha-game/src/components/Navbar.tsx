import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useNav } from '@/lib/navigation';

export function Navbar() {
  const [location] = useLocation();
  const { go } = useNav();

  const links = [
    { href: '/gacha', label: 'GACHA' },
    { href: '/collection', label: 'COLLECTION' },
    { href: '/rates', label: 'RATES' },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Row 1: logo + verbal */}
        <div className="flex items-center justify-between h-12 sm:h-16">

          {/* New! lanc project — ロード挟んでホームへ */}
          <button
            onClick={() => go('/')}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
          >
            <motion.span
              className="font-black text-xs sm:text-sm px-2.5 py-1 rounded-full border"
              style={{
                color: '#fff',
                backgroundColor: '#06b6d4',
                borderColor: '#22d3ee',
                boxShadow: '0 0 12px rgba(6,182,212,0.9), 0 0 28px rgba(6,182,212,0.5)',
              }}
              animate={{
                boxShadow: [
                  '0 0 12px rgba(6,182,212,0.9), 0 0 28px rgba(6,182,212,0.5)',
                  '0 0 20px rgba(6,182,212,1), 0 0 48px rgba(6,182,212,0.8)',
                  '0 0 12px rgba(6,182,212,0.9), 0 0 28px rgba(6,182,212,0.5)',
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              New!
            </motion.span>
            <span className="font-black tracking-[0.2em] text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              lanc project
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden sm:flex gap-2">
            {links.map(link => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-bold tracking-wider transition-all duration-300 ${
                    active
                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Verbal badge */}
          <div className="px-2 sm:px-4 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/50 flex items-center gap-1 sm:gap-2 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <span className="text-cyan-400 font-bold text-xs sm:text-sm">VERBAL</span>
            <span className="text-white font-mono font-bold text-xs sm:text-sm tracking-wider">
              999,999,999
            </span>
          </div>
        </div>

        {/* Row 2: mobile nav links */}
        <div className="flex sm:hidden justify-around border-t border-white/10 h-10">
          {links.map(link => {
            const active = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex-1 flex items-center justify-center text-xs font-bold tracking-wider transition-all duration-200 ${
                  active
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
