'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Countdown from '@/components/Countdown'
import Landing from '@/components/Landing'
import Celebration from '@/components/Celebration'
import Message from '@/components/Message'
import MomenSlideshow from '@/components/MomenSlideshow'
import Gallery from '@/components/Gallery'
import Portrait from '@/components/Portrait'
import FunFacts from '@/components/FunFacts'
import Closing from '@/components/Closing'
import MusicPlayer from '@/components/MusicPlayer'

// Flow:
// 0: Countdown → 1: Landing → 2: Celebration → 3: Message
// → 4: MomenSlideshow → 5: Gallery → 6: Portrait → 7: FunFacts → 8: Closing

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [musicStarted, setMusicStarted] = useState(false)

  const next = () => setCurrent(prev => prev + 1)

  const startFromCountdown = () => setCurrent(1)

  const startExperience = () => {
    setCurrent(2)
    setMusicStarted(true)
  }

  const pages = [
    <Countdown key="countdown" onDone={startFromCountdown} />,
    <Landing key="landing" onStart={startExperience} />,
    <Celebration key="celebration" onNext={next} />,
    <Message key="message" onNext={next} />,
    <MomenSlideshow key="momen" onDone={next} />,
    <Gallery key="gallery" onNext={next} />,
    <Portrait key="portrait" onNext={next} />,
    <FunFacts key="funfacts" onNext={next} />,
    <Closing key="closing" />,
  ]

  return (
    <main className="relative w-screen h-screen">
      <AnimatePresence mode="wait">
        {pages[current]}
      </AnimatePresence>
      {musicStarted && <MusicPlayer />}
    </main>
  )
}
