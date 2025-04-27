import React, { useState } from 'react'
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

  const speak = async (text: string) => {
    try {
      const response = await fetch('http://localhost:5050/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      audio.play()
    } catch (err) {
      console.error('Failed to speak:', err)
    }
  }

  const handleCombinedClick = async () => {
    await speak(combined)
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
