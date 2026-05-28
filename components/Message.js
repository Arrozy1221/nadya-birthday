'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const slides = [
  { text: "Halo sayang,", photo: "moment_taman.jpg" },
  { text: "Hari ini genap 11 bulan kita bersama 🎂✨ Gila ya, rasanya cepet banget tapi juga berasa panjang karena banyak banget yang kita laluin bareng.", photo: "moment_wisata.jpg" },
  { text: "Bee, aku mau bilang makasih. Makasih banget udah sabar sama aku yang masih banyak salahnya 🥺", photo: "photo1.jpg" },
  { text: "Aku tahu aku sering bikin kamu nangis 😭, sering bikin kamu kesel. Aku tahu itu berat buat kamu.", photo: "moment_duduk.jpg" },
  { text: "Tapi kamu tetep di sini. Kamu tetep mau ngerti aku. Dan itu yang bikin aku sayang banget sama kamu 💛", photo: "moment_perahu.jpg" },
  { text: "Aku janji bakal terus berusaha jadi lebih baik. Lebih peka, lebih bisa jadi tempat yang nyaman buat kamu 🫶", photo: "moment_danau.jpg" },
  { text: "Kamu adalah alasan aku pengen berubah, Bee. Pengen jadi versi terbaik dari diriku, buat kamu, buat kita 💕", photo: "photo2.jpg" },
  { text: "Semoga kita bisa terus bersama sampai akhirnya aku bisa panggil kamu bukan cuma \"Bee\", tapi \"istriku\" 💍✨", photo: "moment_shadow.jpg" },
  { text: "Aku sayang kamu. Bukan karena kamu sempurna, tapi karena kamu mau sabar sama aku yang nggak sempurna 🥺💛", photo: "photo6.jpg" },
]

export default function Message({ onNext }) {
  const [idx, setIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    const duration = Math.max(3000, slides[idx].text.length * 45) // ~45ms per karakter
    const t = setTimeout(() => {
      if (idx >= slides.length - 1) { setDone(true) }
      else { setIdx(prev => prev + 1) }
    }, duration)
    return () => clearTimeout(t)
  }, [done, idx])

  const s = slides[idx]

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950 overflow-hidden"
    >
      <div className="absolute w-80 h-80 bg-rose-500/10 rounded-full blur-3xl top-20 left-10" />
      <div className="absolute w-60 h-60 bg-pink-500/10 rounded-full blur-3xl bottom-20 right-10" />

      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-4 md:px-12 py-8">
        {/* LEFT: Photo */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-64 h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-rose-500/30 border-2 border-white/10">
            <AnimatePresence mode="wait">
              <motion.img key={s.photo} src={`/img/${s.photo}`} alt="Our moment"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }} />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white/80 text-xs">{idx + 1} / {slides.length}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl text-rose-400 mb-6"
            style={{ fontFamily: 'var(--font-script)' }}>
            🎉 Untuk Bee 🐝💛
          </motion.p>

          <div className="min-h-[120px] md:min-h-[160px] flex items-start">
            <AnimatePresence mode="wait">
              <motion.p key={idx}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.5 }}
                className="text-white/90 text-sm md:text-lg leading-relaxed max-w-md text-center md:text-left">
                {s.text}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1.5 mt-6 mb-4">
            {slides.map((_, i) => (
              <motion.div key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? 'bg-rose-400 w-6' : i < idx ? 'bg-rose-400/50 w-1.5' : 'bg-white/20 w-1.5'
                }`} />
            ))}
          </div>

          {!done && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => { if (idx < slides.length - 1) setIdx(prev => prev + 1); else setDone(true) }}
              className="text-white/30 text-xs mt-2 hover:text-white/50 transition-colors cursor-pointer">
              tap untuk lanjut →
            </motion.button>
          )}

          <AnimatePresence>
            {done && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }} className="mt-4">
                <p className="text-lg text-rose-300 mb-1" style={{ fontFamily: 'var(--font-script)' }}>
                  Yang masih belajar jadi lebih baik buat kamu 🐝💛
                </p>
                <p className="text-2xl text-rose-400 font-bold mb-6" style={{ fontFamily: 'var(--font-script)' }}>
                  — Arrozy ❤️
                </p>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={onNext}
                  className="bg-white/15 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/25 transition-all cursor-pointer">
                  Lanjut →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
