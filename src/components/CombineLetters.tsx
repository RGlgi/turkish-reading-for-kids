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
      <h3>Heceyi Dinle ve Öğren</h3>
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
