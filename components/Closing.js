'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const hearts = ['❤️','💕','💖','💗','💝','🩷','💘']

export default function Closing() {
  const [floatingHearts, setFloatingHearts] = useState([])

  const [raindrops, setRaindrops] = useState([])

  useEffect(() => {
    setFloatingHearts(Array.from({ length: 20 }, (_, i) => ({
      id: i, emoji: hearts[i % hearts.length],
      x: Math.random() * 100, delay: Math.random() * 5,
      duration: 4 + Math.random() * 4, size: 1 + Math.random() * 1.5
    })))
    setRaindrops(Array.from({ length: 40 }, (_, i) => ({
      id: i, x: Math.random() * 100, delay: Math.random() * 3,
      duration: 1 + Math.random() * 1.5, height: 10 + Math.random() * 20
    })))
  }, [])

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-rose-950 via-pink-800 to-rose-600 overflow-hidden">
      {/* Rain effect */}
      {raindrops.map(r => (
        <motion.div key={`rain-${r.id}`}
          className="absolute top-[-20px] w-[1px] bg-white/20 rounded-full pointer-events-none"
          style={{ left: `${r.x}%`, height: r.height }}
          animate={{ y: [0, 1200], opacity: [0.3, 0] }}
          transition={{ duration: r.duration, delay: r.delay, repeat: Infinity, ease: 'linear' }} />
      ))}

      {floatingHearts.map(h => (
        <motion.span key={h.id} className="absolute pointer-events-none"
          style={{ left: `${h.x}%`, bottom: '-40px', fontSize: `${h.size}rem` }}
          animate={{ y: [0, -1200], opacity: [1, 0.5, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'easeOut' }}>
          {h.emoji}
        </motion.span>
      ))}
      <div className="absolute w-96 h-96 bg-rose-400/20 rounded-full blur-3xl" />
      <div className="text-center z-10 px-6">
        <motion.div animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-7xl mb-6">❤️</motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }} className="text-rose-200 text-lg mb-3">
          Sekali lagi...
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-4xl md:text-5xl text-white mb-4"
          style={{ fontFamily: 'var(--font-script)' }}>
          Happy Birthday, Nadya! 🎂
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-rose-100 mb-6 text-sm md:text-base">
          Semoga tahun ke-22 ini jadi tahun terbaik kamu.
        </motion.p>
        <motion.p initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: 'spring' }}
          className="text-3xl md:text-4xl text-yellow-300"
          style={{ fontFamily: 'var(--font-script)' }}>
          I love you 💕
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-rose-300 mt-6 text-xl"
          style={{ fontFamily: 'var(--font-script)' }}>
          — Arrozy 🐝💛
        </motion.p>

        {/* Link to Ucapan page */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2 }} className="mt-8">
          <Link href="/ucapan">
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #d2aa77, #a87843)',
                color: '#120f0d',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 18px 40px rgba(109, 76, 40, 0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              Tulis Ucapan untuk Nadya 💌
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
