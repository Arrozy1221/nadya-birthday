'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const balloonEmojis = ['🎈','🎊','🎉','🎀','🎁','🩷','💝']
const confettiColors = ['#ff6b9d','#ffd93d','#6bcb77','#4d96ff','#ff6eb4','#a855f7','#ffd700','#f472b6']

export default function Celebration({ onNext }) {
  const [balloons, setBalloons] = useState([])
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    setBalloons(Array.from({ length: 25 }, (_, i) => ({
      id: i, emoji: balloonEmojis[i % balloonEmojis.length],
      x: Math.random() * 100, delay: Math.random() * 2,
      duration: 3 + Math.random() * 3, size: 2 + Math.random() * 2
    })))
    setConfetti(Array.from({ length: 60 }, (_, i) => ({
      id: i, x: Math.random() * 100,
      color: confettiColors[i % confettiColors.length],
      delay: Math.random() * 2, duration: 2 + Math.random() * 3,
      size: 5 + Math.random() * 10, rotation: Math.random() * 720
    })))
  }, [])

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-900 via-rose-800 to-fuchsia-900 overflow-hidden">
      {balloons.map(b => (
        <motion.span key={b.id} className="absolute pointer-events-none"
          style={{ left: `${b.x}%`, bottom: '-60px', fontSize: `${b.size}rem` }}
          animate={{ y: [0, -1200], rotate: [0, 20, -20, 0] }}
          transition={{ duration: b.duration, delay: b.delay, ease: 'easeOut' }}>
          {b.emoji}
        </motion.span>
      ))}
      {confetti.map(c => (
        <motion.div key={c.id} className="absolute top-[-15px] rounded-sm"
          style={{ left: `${c.x}%`, width: c.size, height: c.size, backgroundColor: c.color }}
          animate={{ y: [0, 1200], rotate: [0, c.rotation] }}
          transition={{ duration: c.duration, delay: c.delay, ease: 'easeIn' }} />
      ))}
      <div className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}>
          <span className="text-7xl block mb-4">🎂</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl text-yellow-300 mb-3"
          style={{ fontFamily: 'var(--font-script)' }}>
          🎉 Happy 22nd Birthday! 🎉
        </motion.h1>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-2xl md:text-3xl text-white mb-2"
          style={{ fontFamily: 'var(--font-display)' }}>
          Nadya Aisyah Rahmani
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1 }} className="text-rose-200 mb-8">14 Juni 2026</motion.p>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="bg-white/15 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/25 transition-all cursor-pointer">
          Lanjut →
        </motion.button>
      </div>
    </motion.section>
  )
}
