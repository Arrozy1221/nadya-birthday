'use client'
import { motion } from 'framer-motion'

export default function Portrait({ onNext }) {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-950 via-rose-950 to-pink-950 overflow-hidden px-4">
      <div className="absolute w-80 h-80 bg-rose-500/20 rounded-full blur-3xl" />
      <div className="text-center z-10">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl text-yellow-300 mb-6"
          style={{ fontFamily: 'var(--font-script)' }}>
          The Birthday Girl 👑
        </motion.h2>
        <motion.div initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
          className="w-64 h-80 md:w-72 md:h-96 mx-auto rounded-2xl overflow-hidden border-4 border-rose-400/50 shadow-2xl shadow-rose-500/30 mb-6">
          <img src="/img/nadya-portrait.jpg" alt="Nadya Aisyah Rahmani"
            className="w-full h-full object-cover" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-rose-200 italic text-sm md:text-base mb-6 max-w-sm mx-auto">
          &quot;Cantik, baik, dan selalu bikin hari-hari lebih berwarna ✨&quot;
        </motion.p>
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
