'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const moments = [
  { src: 'moment_taman.jpg', label: 'Jalan di Taman', emoji: '🌿' },
  { src: 'moment_wisata.jpg', label: 'Wisata Bareng', emoji: '🏡' },
  { src: 'photo1.jpg', label: 'Photo Booth', emoji: '📸' },
  { src: 'moment_duduk.jpg', label: 'Santai Bareng', emoji: '☁️' },
  { src: 'moment_perahu.jpg', label: 'Naik Perahu', emoji: '⛵' },
  { src: 'moment_danau.jpg', label: 'Di Danau', emoji: '🌅' },
  { src: 'photo3.jpg', label: 'Gaming Date', emoji: '🎮' },
  { src: 'photo6.jpg', label: 'Disco Vibes', emoji: '🪩' },
  { src: 'moment_shadow.jpg', label: 'Our Shadow', emoji: '🌙' },
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.8 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.8 }),
}

export default function MomenSlideshow({ onDone }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (finished) return
    const timer = setTimeout(() => {
      if (idx >= moments.length - 1) {
        setFinished(true)
      } else {
        setDir(1)
        setIdx(prev => prev + 1)
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [idx, finished])

  const m = moments[idx]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-rose-950 via-pink-950 to-fuchsia-950 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Glow */}
      <div className="absolute w-80 h-80 bg-rose-500/15 rounded-full blur-3xl" />

      {/* Progress bar */}
      <div className="absolute top-6 left-6 right-6 flex gap-1 z-20">
        {moments.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full overflow-hidden bg-white/15">
            <motion.div
              className="h-full bg-rose-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: i < idx ? '100%' : i === idx ? '100%' : '0%' }}
              transition={{ duration: i === idx ? 2.5 : 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-rose-300 text-sm tracking-widest uppercase mb-6 z-10"
      >
        Momen Indah Kita
      </motion.p>

      {/* Photo frame - centered, not fullscreen */}
      <div className="relative w-72 h-80 md:w-80 md:h-96 z-10">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={m.src}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-rose-500/30 border-2 border-white/10"
          >
            <img src={`/img/${m.src}`} alt={m.label}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Label */}
      <div className="mt-6 text-center z-10">
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}>
            <span className="text-3xl block mb-2">{m.emoji}</span>
            <h2 className="text-xl md:text-2xl text-white font-semibold"
              style={{ fontFamily: 'var(--font-display)' }}>
              {m.label}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Skip / Done */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        {!finished ? (
          <button
            onClick={() => {
              if (idx < moments.length - 1) { setDir(1); setIdx(prev => prev + 1) }
              else setFinished(true)
            }}
            className="text-white/30 text-xs hover:text-white/60 transition-colors cursor-pointer tracking-widest uppercase">
            skip →
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-white/50 text-sm mb-4">Semua momen indah kita ✨</p>
            <button onClick={onDone}
              className="bg-white/15 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/25 transition-all cursor-pointer">
              Lihat Semua Foto →
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
