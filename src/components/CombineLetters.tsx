import React, { useState } from 'react'
import Confetti from 'react-confetti'
import CorrectSound from '../assets/sounds/correct.mp3'

export const CombineLetters: React.FC = () => {
  const syllables = [
    ['A', 'H', 'AH'],
    ['E', 'Y', 'EY'],
    ['B', 'U', 'BU'],
    ['E', 'V', 'EV'],
    ['İ', 'N', 'İN'],
    ['A', 'Y', 'AY'],
    ['O', 'T', 'OT'],
    ['Ş', 'U', 'ŞU'],
    ['E', 'K', 'EK'],
    ['S', 'U', 'SU'],
    ['Ü', 'Ç', 'ÜÇ'],
    ['O', 'H', 'OH'],
    ['O', 'K', 'OK'],
    ['A', 'N', 'AN'],
    ['E', 'R', 'ER'],
    ['İ', 'P', 'İP'],
    ['İ', 'Ş', 'İŞ'],
    ['Ö', 'N', 'ÖN'],
    ['O', 'L', 'OL'],
    ['D', 'A', 'DA'],
    ['T', 'A', 'TA'],
    ['T', 'E', 'TE'],
    ['K', 'İ', 'Kİ'],
    ['A', 'L', 'AL'],
    ['R', 'E', 'RE'],
    ['M', 'E', 'ME'],
    ['N', 'E', 'NE'],
    ['B', 'Ü', 'BÜ'],
    ['Ö', 'P', 'ÖP'],
    ['Y', 'A', 'YA'],
  ]

  const [index, setIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text.toLowerCase()) // ✅ Lowercase for clean pronunciation
    speech.lang = 'tr-TR'
    speech.rate = 0.8
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
      <h3>Harfleri Birleştir ve Oku</h3>
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
