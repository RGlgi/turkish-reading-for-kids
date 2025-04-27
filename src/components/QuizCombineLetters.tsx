import React, { useState, useEffect, useCallback } from 'react'
import PlayIcon from '../assets/play-icon.png'
import CorrectSound from '../assets/sounds/correct.mp3'
import WrongSound from '../assets/sounds/wrong-answer.mp3'
import Confetti from 'react-confetti'
import './SesSorulari.css'

const questions = [
  'OH',
  'AT',
  'EV',
  'EY',
  'OY',
  'EK',
  'AH',
  'AY',
  'SU',
  'BU',
  'ŞU',
  'İN',
  'OT',
  'ÜÇ',
  'AN',
  'İP',
  'İŞ',
  'ÖN',
  'ER',
  'OL',
  'DA',
  'TE',
  'RE',
  'BÜ',
  'ÖP',
  'NE',
  'ME',
  'Kİ',
  'TA',
]

export const QuizCombineLetters: React.FC = () => {
  const [question, setQuestion] = useState('')
  const [choices, setChoices] = useState<string[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [shakeIndex, setShakeIndex] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const getRandomChoices = useCallback((correct: string) => {
    const others = questions.filter((q) => q !== correct)
    const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 2)
    return [...shuffled, correct].sort(() => 0.5 - Math.random())
  }, [])

  const generateQuestion = useCallback(() => {
    const q = questions[Math.floor(Math.random() * questions.length)]
    setQuestion(q)
    setChoices(getRandomChoices(q))
    setFeedback(null)
    setShakeIndex(null)
    setShowConfetti(false)
  }, [getRandomChoices])

  useEffect(() => {
    generateQuestion()
  }, [generateQuestion])

  const playSound = async () => {
    try {
      const response = await fetch('http://localhost:5050/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: question }),
      })
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      audio.play()
    } catch (err) {
      console.error('Sound error:', err)
    }
  }

  const handleChoiceClick = (choice: string, index: number) => {
    if (showConfetti) return // Prevent multiple clicks during confetti

    if (choice === question) {
      setFeedback('correct')
      new Audio(CorrectSound).play()
      setShowConfetti(true)

      setTimeout(() => {
        generateQuestion()
      }, 4000)
    } else {
      setFeedback('wrong')
      setShakeIndex(index)
      new Audio(WrongSound).play()
      setTimeout(() => setShakeIndex(null), 500)
    }
  }

  return (
    <div>
      {showConfetti && <Confetti />}

      <div>
        <img
          src={PlayIcon}
          alt="Harfi Dinle"
          onClick={playSound}
          className="sound-icon"
          title="Harfi Dinle"
        />

        <div className="choices">
          {choices.map((choice, index) => (
            <button
              key={index}
              className={`choice ${shakeIndex === index ? 'shake' : ''}`}
              onClick={() => handleChoiceClick(choice, index)}
              disabled={feedback === 'correct' || showConfetti}
            >
              {choice}
            </button>
          ))}
        </div>

        {feedback === 'correct' && <p className="feedback">✅ Doğru!</p>}
      </div>
    </div>
  )
}
