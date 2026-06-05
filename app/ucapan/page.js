'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const NADYA_PHOTOS = [
  { src: 'nailong-card-1.jpg', label: '✨' },
  { src: 'nailong-card-2.jpg', label: '💖' },
  { src: 'nailong-card-3.jpg', label: '🌸' },
  { src: 'nailong-card-4.jpg', label: '💫' },
  { src: 'nailong-card-5.jpg', label: '🎀' },
  { src: 'nailong-card-6.jpg', label: '💝' },
  { src: 'nailong-card-7.jpg', label: '🌟' },
  { src: 'nailong-card-8.jpg', label: '🩷' },
]

function getTimeAgo(timestamp) {
  const now = Date.now()
  const date = new Date(timestamp)
  const diff = now - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Baru saja'
  if (mins < 60) return `${mins} menit yang lalu`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} jam yang lalu`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days} hari yang lalu`
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Decorative gold divider
function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div style={{ height: 1, width: 48, background: 'linear-gradient(to right, transparent, rgba(196,154,101,0.6))' }} />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#c49a65" opacity="0.7" />
      </svg>
      <div style={{ height: 1, width: 48, background: 'linear-gradient(to left, transparent, rgba(196,154,101,0.6))' }} />
    </div>
  )
}

// Single greeting card component
function GreetingCard({ wish, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: Math.min(index * 0.08, 0.8), duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden"
      style={{
        borderRadius: 28,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(196,154,101,0.12)',
        boxShadow: '0 24px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
        e.currentTarget.style.boxShadow = '0 32px 80px rgba(0,0,0,0.35), inset 0 0 40px rgba(196,154,101,0.06), inset 0 1px 0 rgba(255,255,255,0.03)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = '0 24px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)'
      }}
    >
      {/* Photo background */}
      <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
        <img
          src={`/img/${wish.photo}`}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.15, transform: 'scale(1.1)', transition: 'all 0.6s ease' }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(13,11,10,0.95), rgba(13,11,10,0.80), rgba(13,11,10,0.60))'
        }} />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: 0.04,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.22) 0.6px, transparent 0.6px)',
        backgroundSize: '7px 7px',
      }} />

      {/* Content */}
      <div className="relative" style={{ zIndex: 10, padding: '24px 28px' }}>
        {/* Sender info */}
        <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', overflow: 'hidden',
            border: '1px solid rgba(196,154,101,0.3)', flexShrink: 0,
          }}>
            <img src={`/img/${wish.photo}`} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p style={{
              color: '#f5eee7', fontSize: 14, fontWeight: 600,
              fontFamily: "'Playfair Display', serif", letterSpacing: '0.02em',
            }}>
              {wish.name}
            </p>
            <p style={{ color: '#907f6d', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {getTimeAgo(wish.created_at)}
            </p>
          </div>
        </div>

        <GoldDivider className="" />

        {/* Message */}
        <p style={{
          color: '#d4c5b4', fontSize: 14, lineHeight: 1.75, marginTop: 16,
          fontFamily: "'Poppins', sans-serif", letterSpacing: '0.01em',
        }}>
          &ldquo;{wish.message}&rdquo;
        </p>

        {/* Bottom accent */}
        <div className="flex items-center" style={{ marginTop: 20, gap: 6 }}>
          <span style={{ color: 'rgba(196,154,101,0.6)', fontSize: 16 }}>💌</span>
          <span style={{ color: '#907f6d', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Untuk Nadya
          </span>
          <div style={{ height: 1, flex: 1, marginLeft: 12, background: 'linear-gradient(to right, rgba(196,154,101,0.2), transparent)' }} />
          <span style={{ color: 'rgba(196,154,101,0.4)', fontSize: 12 }}>✦</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function UcapanPage() {
  const [wishes, setWishes] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  // Override body overflow for this page
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflow = 'hidden'
    }
  }, [])

  // Fetch wishes from Supabase
  const fetchWishes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setWishes(data || [])
    } catch (err) {
      console.error('Error fetching wishes:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWishes()
  }, [fetchWishes])

  // Submit new wish
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert([{
          name: name.trim(),
          message: message.trim(),
          photo: NADYA_PHOTOS[selectedPhoto].src,
        }])
        .select()

      if (error) throw error

      // Add the new wish at the top
      if (data && data.length > 0) {
        setWishes(prev => [data[0], ...prev])
      }

      setName('')
      setMessage('')
      setSelectedPhoto(0)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err) {
      console.error('Error submitting wish:', err)
      alert('Gagal mengirim ucapan. Coba lagi ya!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d0b0a 0%, #14110f 50%, #0d0b0a 100%)',
      fontFamily: "'Poppins', sans-serif",
      color: '#f4ede5',
      position: 'relative',
    }}>
      {/* ===== GLOBAL DECORATIONS ===== */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 1, opacity: 0.04,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.22) 0.6px, transparent 0.6px)',
        backgroundSize: '7px 7px',
      }} />

      {/* Gold glow orbs */}
      <div className="fixed pointer-events-none" style={{
        top: '10%', left: '-5%', width: 240, height: 240, borderRadius: '50%',
        background: '#b68856', filter: 'blur(100px)', opacity: 0.15, zIndex: 0,
        animation: 'pulseFloat 8s ease-in-out infinite',
      }} />
      <div className="fixed pointer-events-none" style={{
        bottom: '5%', right: '-5%', width: 280, height: 280, borderRadius: '50%',
        background: '#8d5c2f', filter: 'blur(100px)', opacity: 0.12, zIndex: 0,
        animation: 'pulseFloat 8s ease-in-out infinite 4s',
      }} />
      <div className="fixed pointer-events-none" style={{
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 380, height: 380, borderRadius: '50%',
        background: '#c49a65', filter: 'blur(150px)', opacity: 0.06, zIndex: 0,
      }} />

      {/* ===== HERO SECTION ===== */}
      <section className="relative flex items-center justify-center" style={{ minHeight: '70vh', overflow: 'hidden' }}>
        <div className="absolute inset-0">
          <img src="/img/nadya-card-3.jpg" alt="Nadya"
            className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(13,11,10,0.4), rgba(13,11,10,0.7), #0d0b0a)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(13,11,10,0.6) 100%)'
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative text-center"
          style={{ zIndex: 10, padding: '80px 24px' }}
        >
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(209,168,115,0.92)', marginBottom: 20 }}
          >
            Birthday Wishes
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ width: 40, height: 1, margin: '0 auto 24px', background: 'linear-gradient(90deg, transparent, rgba(204,167,114,0.88), transparent)' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{
              fontFamily: "'Playfair Display', serif", color: '#f8f2ea',
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', lineHeight: 0.95,
              marginBottom: 24, textShadow: '0 8px 30px rgba(0,0,0,0.35)',
            }}
          >
            Ucapan untuk
            <span className="block" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', margin: '12px 0', color: '#c9a06b', fontFamily: "'Dancing Script', cursive" }}>
              ✦
            </span>
            Nadya
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ color: '#b8ab9d', fontSize: 14, maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}
          >
            Tuliskan doa dan ucapan terbaikmu untuk Nadya di hari ulang tahunnya yang ke-22 🎂
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{ marginTop: 40 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center" style={{ gap: 8 }}
            >
              <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#907f6d' }}>Scroll</span>
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                <path d="M7 0L7 16M7 16L1 10M7 16L13 10" stroke="#907f6d" strokeWidth="1.2" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section className="relative" style={{ zIndex: 10, maxWidth: 640, margin: '0 auto', padding: '64px 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: 40 }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#b98f5e', marginBottom: 16 }}>
            Write Your Wishes
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#f5eee7', fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', marginBottom: 12 }}>
            Tulis Ucapanmu
          </h2>
          <GoldDivider />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          style={{
            borderRadius: 34, padding: 'clamp(24px, 4vw, 40px)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(196,154,101,0.10)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          {/* Name input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b39067', marginBottom: 12 }}>
              Nama Kamu
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama kamu..."
              maxLength={50}
              required
              style={{
                width: '100%', padding: '16px 20px', borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(196,154,101,0.12)',
                outline: 'none', color: '#f3ece5', fontSize: 14,
                fontFamily: "'Poppins', sans-serif",
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(210,170,119,0.35)'
                e.target.style.boxShadow = '0 0 0 4px rgba(210,170,119,0.08)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(196,154,101,0.12)'
                e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.02)'
              }}
            />
          </div>

          {/* Message textarea */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b39067', marginBottom: 12 }}>
              Pesan Ucapan
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan ulang tahun untuk Nadya..."
              maxLength={500}
              required
              rows={4}
              style={{
                width: '100%', padding: '16px 20px', borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(196,154,101,0.12)',
                outline: 'none', color: '#f3ece5', fontSize: 14,
                fontFamily: "'Poppins', sans-serif",
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                resize: 'none', boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(210,170,119,0.35)'
                e.target.style.boxShadow = '0 0 0 4px rgba(210,170,119,0.08)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(196,154,101,0.12)'
                e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.02)'
              }}
            />
            <p style={{ textAlign: 'right', fontSize: 10, color: '#907f6d', marginTop: 6 }}>
              {message.length}/500
            </p>
          </div>

          {/* Photo selector */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b39067', marginBottom: 12 }}>
              Pilih Foto Latar Kartu
            </label>
            <div className="grid grid-cols-4" style={{ gap: 10 }}>
              {NADYA_PHOTOS.map((photo, i) => (
                <motion.button
                  key={photo.src}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPhoto(i)}
                  className="relative"
                  style={{
                    aspectRatio: '1/1', borderRadius: 16, overflow: 'hidden',
                    border: selectedPhoto === i ? '2px solid #d2aa77' : '1px solid rgba(196,154,101,0.12)',
                    boxShadow: selectedPhoto === i
                      ? '0 0 20px rgba(210,170,119,0.25), 0 12px 24px rgba(0,0,0,0.3)'
                      : '0 8px 20px rgba(0,0,0,0.2)',
                    cursor: 'pointer', padding: 0, background: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <img src={`/img/${photo.src}`} alt={`Foto ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ opacity: selectedPhoto === i ? 1 : 0.5, transition: 'opacity 0.3s ease' }}
                  />
                  {selectedPhoto === i && (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'rgba(13,11,10,0.4)' }}
                    >
                      <div className="flex items-center justify-center" style={{
                        width: 28, height: 28, borderRadius: '50%', fontSize: 10,
                        background: 'linear-gradient(135deg, #d2aa77, #a87843)',
                        color: '#120f0d', fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(168,120,67,0.4)',
                      }}>✓</div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            whileHover={{ translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', padding: '16px 0', borderRadius: 9999,
              fontSize: 13, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #d2aa77, #a87843)',
              color: '#120f0d',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 18px 40px rgba(109,76,40,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
              cursor: (!name.trim() || !message.trim() || isSubmitting) ? 'not-allowed' : 'pointer',
              opacity: (!name.trim() || !message.trim() || isSubmitting) ? 0.4 : 1,
              transition: 'all 0.3s ease',
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center" style={{ gap: 8 }}>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ display: 'inline-block' }}
                >✦</motion.span>
                Mengirim...
              </span>
            ) : 'Kirim Ucapan 💌'}
          </motion.button>
        </motion.form>
      </section>

      {/* ===== SUCCESS TOAST ===== */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="fixed flex items-center"
            style={{
              bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
              gap: 12, padding: '16px 24px', borderRadius: 9999,
              background: 'rgba(245,236,226,0.92)',
              backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(210,170,119,0.22)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.5)',
              color: '#2b2118',
            }}
          >
            <div className="flex items-center justify-center" style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0, fontSize: 14,
              background: 'linear-gradient(135deg, #d2aa77, #a87843)',
              color: '#140f0c', boxShadow: '0 10px 24px rgba(168,120,67,0.25)',
            }}>✓</div>
            <p style={{ fontSize: 14, fontWeight: 500 }}>Ucapan berhasil dikirim! 💌</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== WISHES GALLERY ===== */}
      <section className="relative" style={{ zIndex: 10, maxWidth: 960, margin: '0 auto', padding: '0 20px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: 48 }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: '#b98f5e', marginBottom: 16 }}>
            Greeting Cards
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#f5eee7', fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', marginBottom: 12 }}>
            Kartu Ucapan
          </h2>
          <GoldDivider />
          <p style={{ fontSize: 13, color: '#907f6d', marginTop: 16 }}>
            {loading ? 'Memuat ucapan...' : wishes.length > 0
              ? `${wishes.length} ucapan telah dikirim`
              : 'Jadilah yang pertama menulis ucapan untuk Nadya ✨'}
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                borderRadius: 28, padding: 28, height: 200,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(196,154,101,0.08)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
            ))}
          </div>
        )}

        {/* Cards grid */}
        {!loading && wishes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
            {wishes.map((wish, i) => (
              <GreetingCard key={wish.id} wish={wish} index={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && wishes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            style={{
              padding: '80px 20px', borderRadius: 34,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(196,154,101,0.08)',
            }}
          >
            <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>💌</span>
            <p style={{ color: '#907f6d', fontSize: 14 }}>
              Belum ada ucapan. Yuk tulis ucapan pertama!
            </p>
          </motion.div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative text-center" style={{
        zIndex: 10, borderTop: '1px solid rgba(196,154,101,0.08)', padding: '40px 20px',
      }}>
        <GoldDivider className="" style={{ marginBottom: 24 }} />
        <div style={{ marginTop: 24 }}>
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center"
              style={{
                gap: 8, padding: '12px 24px', borderRadius: 9999,
                fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.02)', color: '#d2aa77',
                border: '1px solid rgba(210,170,119,0.24)',
                boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}
            >
              ← Kembali ke Halaman Utama
            </motion.span>
          </Link>
        </div>
        <p style={{ marginTop: 24, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#907f6d' }}>
          Made with 💛 for Nadya&apos;s 22nd Birthday
        </p>
      </footer>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes pulseFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.04); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        input::placeholder, textarea::placeholder {
          color: #8c7c6c !important;
        }
      `}</style>
    </div>
  )
}
