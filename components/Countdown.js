'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Countdown({ onDone }) {
  const [timeLeft, setTimeLeft] = useState(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [wrongPass, setWrongPass] = useState(false)
  const [mounted, setMounted] = useState(false)

  const SECRET_PASS = 'bee1406'

  useEffect(() => {
    setMounted(true)
    const target = new Date('2026-06-14T00:00:00+07:00').getTime()

    const update = () => {
      const now = Date.now()
      const diff = target - now

      if (diff <= 0) {
        setIsUnlocked(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === SECRET_PASS) {
      onDone()
    } else {
      setWrongPass(true)
      setPassword('')
      setTimeout(() => setWrongPass(false), 3000)
    }
  }

  // Don't render dynamic content until mounted (fix hydration)
  if (!mounted) {
    return (
      <section className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center">
          <span className="text-5xl">🎂</span>
        </div>
      </section>
    )
  }

  const blocks = [
    { label: 'Hari', value: timeLeft?.days },
    { label: 'Jam', value: timeLeft?.hours },
    { label: 'Menit', value: timeLeft?.minutes },
    { label: 'Detik', value: timeLeft?.seconds },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden"
    >
      <div className="absolute inset-0">
        <img src="/img/moment_danau.jpg" alt="" className="w-full h-full object-cover opacity-20 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>

      <div className="text-center z-10 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <span className="text-5xl mb-4 block">🎂</span>
          <p className="text-rose-300/70 text-sm tracking-widest uppercase mb-2">
            {isUnlocked ? 'Hari ini hari spesialmu!' : 'Menuju hari spesialmu'}
          </p>
          <h1 className="text-3xl md:text-4xl text-white mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            14 Juni 2026
          </h1>
        </motion.div>

        {/* Countdown blocks */}
        {!isUnlocked && timeLeft && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex gap-3 md:gap-5 justify-center mb-10">
            {blocks.map((b) => (
              <div key={b.label} className="text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl w-16 h-20 md:w-20 md:h-24 flex items-center justify-center mb-2">
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {String(b.value ?? 0).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-white/40 text-xs tracking-wider">{b.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Unlocked (hari H) */}
        {isUnlocked && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onDone}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg shadow-rose-500/30 cursor-pointer">
            Buka Sekarang 🎁
          </motion.button>
        )}

        {/* Locked - password */}
        {!isUnlocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            {!showPassword ? (
              <div>
                <p className="text-white/40 text-sm mb-6">Sabar ya, belum waktunya... 🐝💛</p>
                <button onClick={() => setShowPassword(true)}
                  className="bg-white/10 backdrop-blur-md border border-white/10 text-white/60 px-6 py-3 rounded-full text-sm hover:bg-white/15 transition-all cursor-pointer">
                  🔒 Masukkan Password
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <form onSubmit={handlePasswordSubmit} className="flex gap-2 justify-center items-center mb-3">
                  <input type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password..."
                    className={`bg-white/10 border ${wrongPass ? 'border-red-500 animate-shake' : 'border-white/20'} rounded-full px-5 py-3 text-white text-sm outline-none focus:border-rose-400 transition-colors w-48 text-center`}
                    autoFocus />
                  <button type="submit"
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-3 rounded-full text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity">
                    Buka
                  </button>
                </form>
                {wrongPass && (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="text-rose-400 text-sm">
                    Belum waktunya yaah 🐝💛
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
