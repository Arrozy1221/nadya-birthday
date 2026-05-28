'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/audio/song.mp4')
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null } }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play(); setPlaying(true) }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10">
      <motion.button onClick={toggle} whileTap={{ scale: 0.9 }}
        animate={playing ? { rotate: [0, 10, -10, 0] } : {}}
        transition={playing ? { duration: 2, repeat: Infinity } : {}}
        className="text-xl cursor-pointer">
        {playing ? '🎵' : '🔇'}
      </motion.button>
      <span className="text-white/60 text-xs hidden sm:block">Shabrina - Chapter</span>
    </motion.div>
  )
}
