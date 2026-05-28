'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Landing({ onStart }) {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    setSparkles(Array.from({ length: 20 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      delay: Math.random() * 3, size: 0.8 + Math.random() * 1.2,
      emoji: ['✨', '⭐', '💫', '🌟', '💖'][i % 5]
    })))
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-rose-950 via-pink-950 to-fuchsia-950 overflow-hidden"
    >
      {sparkles.map(s => (
        <motion.span key={s.id} className="absolute pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: `${s.size}rem` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: s.delay }}
        >{s.emoji}</motion.span>
      ))}
      <div className="absolute w-72 h-72 bg-pink-500/20 rounded-full blur-3xl top-10 -left-20" />
      <div className="absolute w-96 h-96 bg-rose-500/15 rounded-full blur-3xl bottom-10 -right-20" />
      {/* Floating bees */}
      {sparkles.length > 0 && [0,1,2].map(i => (
        <motion.span key={`bee-${i}`} className="absolute pointer-events-none text-2xl"
          style={{ top: `${20 + i * 25}%` }}
          animate={{ x: ['-10%', '110%'], y: [0, -20, 10, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8 + i * 3, repeat: Infinity, delay: i * 2.5, ease: 'linear' }}>
          🐝
        </motion.span>
      ))}

      <div className="text-center z-10 px-6">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-rose-300 text-lg mb-3 tracking-wide">
          Hai, Nadya...
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-4xl md:text-5xl text-white leading-tight mb-10"
          style={{ fontFamily: 'var(--font-display)' }}>
          Ada sesuatu<br /><span className="text-rose-300">untukmu</span> ✨
        </motion.h1>
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-shadow cursor-pointer">
          Buka 🎁
        </motion.button>
      </div>
    </motion.section>
  )
}
