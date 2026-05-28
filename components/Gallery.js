'use client'
import { motion } from 'framer-motion'

const photos = [
  { src: 'photo1.jpg', label: 'Photo Booth 📸' },
  { src: 'moment_taman.jpg', label: 'Jalan di Taman 🌿' },
  { src: 'photo2.jpg', label: 'Selfie Bareng 🤳' },
  { src: 'moment_wisata.jpg', label: 'Wisata Bareng 🏡' },
  { src: 'photo3.jpg', label: 'Gaming Date 🎮' },
  { src: 'moment_duduk.jpg', label: 'Santai Bareng ☁️' },
  { src: 'moment_perahu.jpg', label: 'Naik Perahu ⛵' },
  { src: 'moment_danau.jpg', label: 'Di Danau 🌅' },
  { src: 'photo6.jpg', label: 'Disco Vibes 🪩' },
  { src: 'moment_shadow.jpg', label: 'Our Shadow 🌙' },
  { src: 'photo8.jpg', label: 'Outdoor Date 🌤️' },
  { src: 'photo10.jpg', label: 'Always Together 💕' },
]

export default function Gallery({ onNext }) {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
      className="fixed inset-0 flex flex-col items-center justify-start bg-gradient-to-br from-fuchsia-950 via-rose-950 to-pink-950 overflow-y-auto py-8 px-4">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl text-rose-300 mb-5 z-10"
        style={{ fontFamily: 'var(--font-script)' }}>
        Momen Kita 💕
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl w-full z-10">
        {photos.map((photo, i) => (
          <motion.div key={photo.src}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="aspect-square rounded-xl overflow-hidden shadow-lg shadow-rose-500/20 cursor-pointer relative group">
            <img src={`/img/${photo.src}`} alt={photo.label}
              className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300" loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs text-center">{photo.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }} className="text-center mt-6 mb-8 z-10">
        <button onClick={onNext}
          className="bg-white/15 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/25 transition-all cursor-pointer">
          Lanjut →
        </button>
      </motion.div>
    </motion.section>
  )
}
