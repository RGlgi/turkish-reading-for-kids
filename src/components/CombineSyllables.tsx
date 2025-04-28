import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import CorrectSound from '../assets/sounds/correct.mp3'

export const CombineSyllables: React.FC = () => {
  const syllables = [
    ['BA', 'BA', 'BABA'],
    ['AN', 'NE', 'ANNE'],
    ['AB', 'LA', 'ABLA'],
    ['AB', 'İ', 'ABİ'],
    ['AY', 'LA', 'AYLA'],
    ['AT', 'LA', 'ATLA'],
    ['AL', 'TI', 'ALTI'],
    ['SI', 'RA', 'SIRA'],
    ['A', 'DAM', 'ADAM'],
    ['AY', 'NA', 'AYNA'],
    ['BE', 'BEK', 'BEBEK'],
    ['BÖ', 'REK', 'BÖREK'],
    ['BİL', 'Gİ', 'BİLGİ'],
    ['ES', 'Kİ', 'ESKİ'],
    ['YE', 'Nİ', 'YENİ'],
    ['İP', 'LİK', 'İPLİK'],
    ['İÇ', 'MEK', 'İÇMEK'],
    ['ES', 'MA', 'ESMA'],
    ['YE', 'Dİ', 'YEDİ'],
    ['AN', 'LA', 'ANLA'],
    ['A', 'KIL', 'AKIL'],
    ['AS', 'LAN', 'ASLAN'],
  ]

  const [index, setIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)
    }

    loadVoices()

    if (typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text.toLowerCase())

    const turkishVoice = voices.find((voice) => voice.lang === 'tr-TR')
    if (turkishVoice) {
      speech.voice = turkishVoice
    } else {
      speech.lang = 'tr-TR'
    }

    speech.rate = 0.8
    window.speechSynthesis.cancel() // ✅ Cancel any old speech
    window.speechSynthesis.speak(speech)
  }

  const handleCombinedClick = () => {
    speak(combined)
    new Audio(CorrectSound).play()
    setShowConfetti(true)

    setTimeout(() => {
      setShowConfetti(false)
      setIndex((prev) => (prev + 1) % syllables.length)
    }, 4000)
  }

  const [a, b, combined] = syllables[index]

  return (
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      {showConfetti && <Confetti />}
      <h3>Heceyi Dinle ve Birleştir</h3>
      <div className="combine-row">
        <button onClick={() => speak(a)}>{a}</button>
        <span>+</span>
        <button onClick={() => speak(b)}>{b}</button>
        <span>=</span>
        <button onClick={handleCombinedClick}>{combined}</button>
      </div>
    </div>
  )
}
