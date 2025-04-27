import React, { useEffect, useState } from 'react'
import './SesSorulari.css'
import Confetti from 'react-confetti'
import CorrectSound from '../assets/sounds/correct.mp3'
import WrongSound from '../assets/sounds/wrong-answer.mp3'
import PlayIcon from '../assets/play-icon.png'
import homeIcon from '../assets/home-im.png'
import { useNavigate } from 'react-router-dom'

const letters = [
  'A',
  'B',
  'C',
  'Ç',
  'D',
  'E',
  'F',
  'G',
  'Ğ',
  'H',
  'I',
  'İ',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'Ö',
  'P',
  'R',
  'S',
  'Ş',
  'T',
  'U',
  'Ü',
  'V',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'ç',
  'd',
  'e',
  'f',
  'g',
  'ğ',
  'h',
  'ı',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'ö',
  'p',
  'r',
  's',
  'ş',
  't',
  'u',
  'ü',
  'v',
  'y',
  'z',
]

const getRandomChoices = (correctLetter: string) => {
  const others = letters.filter((l) => l !== correctLetter)
  const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 2)
  const options = [...shuffled, correctLetter].sort(() => 0.5 - Math.random())
  return options
}

interface SesSorulariProps {
  onGoHome: () => void
}

const SesSorulari: React.FC<SesSorulariProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const [questionLetter, setQuestionLetter] = useState('')
  const [choices, setChoices] = useState<string[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [shakeIndex, setShakeIndex] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    generateQuestion()
  }, [])

  const generateQuestion = () => {
    const letter = letters[Math.floor(Math.random() * letters.length)]
    setQuestionLetter(letter)
    setChoices(getRandomChoices(letter))
    setFeedback(null)
    setShakeIndex(null)
    setShowConfetti(false)
  }

  const playLetterSound = () => {
    const speech = new SpeechSynthesisUtterance(questionLetter.toLowerCase()) // ✅ Lowercase to fix Google Speech issues
    speech.lang = 'tr-TR'
    speech.rate = 0.8
    window.speechSynthesis.speak(speech)
  }

  const handleChoiceClick = (letter: string, index: number) => {
    if (showConfetti) return

    if (letter === questionLetter) {
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
      <img
        src={homeIcon}
        alt="Ana Sayfa"
        className="home-button"
        onClick={handleHome}
      />
      <h2>Ses Soruları</h2>

      <div className="ses-wrapper">
        {showConfetti && <Confetti />}

        <div className="question-box2">
          <img
            src={PlayIcon}
            alt="Harf Sesini Dinle"
            onClick={playLetterSound}
            className="sound-icon"
            title="Harf Sesini Dinle"
          />

          <div className="choices2">
            {choices.map((letter, index) => (
              <button
                key={index}
                className={`choice2 ${shakeIndex === index ? 'shake' : ''}`}
                onClick={() => handleChoiceClick(letter, index)}
                disabled={feedback === 'correct' || showConfetti}
              >
                {letter}
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
  )
}

export default SesSorulari
