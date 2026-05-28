'use client'
import { motion } from 'framer-motion'

const facts = [
  { emoji: '☀️', label: 'LAHIR', value: 'Senin, 14 Juni 2004', sub: 'RS Pondok Indah, Jaksel' },
  { emoji: '♊', label: 'ZODIAK', value: 'Gemini', sub: 'Gol. Darah B' },
  { emoji: '🎓', label: 'PENDIDIKAN', value: 'Unpad', sub: 'SMAN 4 Tangsel' },
  { emoji: '👯‍♀️', label: 'BESTIE', value: 'Audi & Refida', sub: 'Saudara kandung ❤️' },
  { emoji: '🍵', label: 'FAVORIT', value: 'Matcha & Sushi', sub: '+ Shihlin + Dimsum' },
  { emoji: 'clove', label: 'HOBBY', value: 'Main Valo', sub: 'Clove Main 💜' },
]

// Floating matcha elements
const matchaItems = ['🍵', '🌿', '🍃', '🌱', '🍵', '🌿', '🍃', '🌱', '🍵', '🍃', '🌿', '🍵']

export default function FunFacts({ onNext }) {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
      className="fixed inset-0 flex flex-col items-center bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 overflow-y-auto py-8 px-4"
      style={{ justifyContent: 'flex-start', paddingTop: '2rem' }}>

      {/* Floating matcha decorations */}
      {matchaItems.map((item, i) => (
        <motion.span key={i}
          className="absolute pointer-events-none text-lg opacity-20"
          style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13.7 + 5) % 90}%`,
          }}
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
        >
          {item}
        </motion.span>
      ))}

      {/* Glow */}
      <div className="absolute w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl top-10 right-10" />
      <div className="absolute w-60 h-60 bg-green-500/10 rounded-full blur-3xl bottom-20 left-10" />

      <div className="text-center z-10 max-w-lg w-full">
        {/* Title */}
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl text-emerald-300 mb-2"
          style={{ fontFamily: 'var(--font-script)' }}>
          🍵 Nadya in Numbers
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-emerald-400/50 text-xs tracking-widest uppercase mb-6">
          Get to know her better
        </motion.p>

        {/* Nadya photo - circular */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-3 border-emerald-400/40 shadow-lg shadow-emerald-500/20"
        >
          <img src="/img/nadya-portrait.jpg" alt="Nadya" className="w-full h-full object-cover" />
        </motion.div>

        {/* Facts grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {facts.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.12, type: 'spring' }}
              className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-emerald-400/10 hover:bg-white/12 hover:border-emerald-400/20 transition-all cursor-default">
              {f.emoji === 'clove' ? (
                <img src="/img/clove-valorant.png" alt="Clove" className="w-10 h-10 mx-auto mb-1 rounded-full object-cover" />
              ) : (
                <p className="text-2xl mb-1">{f.emoji}</p>
              )}
              <p className="text-emerald-300 text-xs font-medium tracking-wider">{f.label}</p>
              <p className="text-white text-sm font-medium">{f.value}</p>
              <p className="text-white/50 text-xs">{f.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Likes section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-emerald-400/10 mb-4">
          <p className="text-emerald-300 text-xs font-medium tracking-wider mb-2">YANG DIA SUKA 💛</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Surprise', 'Dikasih tanpa minta', 'Hujan 🌧️', 'Semua berhasil', 'Ga macet'].map((l, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="bg-emerald-500/15 text-emerald-200 text-xs px-3 py-1.5 rounded-full border border-emerald-400/10">
                {l}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Dislikes section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/5 mb-6">
          <p className="text-rose-300/70 text-xs font-medium tracking-wider mb-2">YANG DIA GAK SUKA 😤</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Kecoa 🪳', 'Macet & Panas', 'Dijemput telat'].map((l, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + i * 0.1 }}
                className="bg-rose-500/10 text-rose-300/70 text-xs px-3 py-1.5 rounded-full border border-rose-400/10">
                {l}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="bg-white/15 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/25 transition-all cursor-pointer mb-8">
          Lanjut →
        </motion.button>
      </div>
    </motion.section>
  )
}
