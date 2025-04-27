import React, { useState, useEffect, useCallback } from 'react'
import PlayIcon from '../assets/play-icon.png'
import CorrectSound from '../assets/sounds/correct.mp3'
import WrongSound from '../assets/sounds/wrong-answer.mp3'
import Confetti from 'react-confetti'
import './SesSorulari.css'
import homeIcon from '../assets/home-im.png'
import { useNavigate } from 'react-router-dom'

const questions = [
  'baba',
  'anne',
  'abla',
  'abi',
  'ayla',
  'altı',
  'sıra',
  'adam',
  'ayna',
  'börek',
  'bebek',
  'eski',
  'bilgi',
  'yeni',
  'iplik',
  'içmek',
  'esma',
  'yedi',
  'anla',
  'akıl',
  'aslan',
]

interface QuizWordProps {
  onGoHome: () => void
}

export const QuizWord: React.FC<QuizWordProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

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
    const speech = new SpeechSynthesisUtterance(question) // Speak exactly as written (already lowercase)
    speech.lang = 'tr-TR'
    speech.rate = 0.8
    window.speechSynthesis.speak(speech)
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

      <img
        src={homeIcon}
        alt="Ana Sayfa"
        className="home-button"
        onClick={handleHome}
      />

      <div className="ses-wrapper">
        <div className="ses-sorulari">
          <h2>Kelime Soruları</h2>

          <div className="question-box2">
            <img
              src={PlayIcon}
              alt="Kelimeyi Dinle"
              onClick={playSound}
              className="sound-icon"
              title="Kelimeyi Dinle"
            />

            <div className="choices2">
              {choices.map((choice, index) => (
                <button
                  key={index}
                  className={`choice2 ${shakeIndex === index ? 'shake' : ''}`}
                  onClick={() => handleChoiceClick(choice, index)}
                  disabled={feedback === 'correct' || showConfetti}
                >
                  {choice}{' '}
                  {/* ✅ show exactly as written (lowercase, mixedcase) */}
                </button>
              ))}
            </div>

            <p className="feedback">
              {feedback === 'correct'
                ? '✅ Doğru!'
                : feedback === 'wrong'
                ? '❌ Yanlış!'
                : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
