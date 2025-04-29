import React, { useState, useEffect, useCallback } from 'react'
import PlayIcon from '../assets/play-icon.png'
import CorrectSound from '../assets/sounds/correct.mp3'
import WrongSound from '../assets/sounds/wrong-answer.mp3'
import Confetti from 'react-confetti'
import './SesSorulari.css'
import { Speak } from './utils/Speak'

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

  const playSound = () => {
    Speak(question)
  }

  const handleChoiceClick = (choice: string, index: number) => {
    if (showConfetti) return

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
    <div className="ses-wrapper1">
      {showConfetti && <Confetti />}

      <div className="ses-sorulari">
        <h2>İki Harfli Hece Soruları</h2>
        <div className="question-box2">
          <img
            src={PlayIcon}
            alt="Heceyi Dinle"
            onClick={playSound}
            className="sound-icon"
            title="Heceyi Dinle"
          />

          <div className="choices2">
            {choices.map((choice, index) => (
              <button
                key={index}
                className={`choice2 ${shakeIndex === index ? 'shake' : ''}`}
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
    </div>
  )
}
