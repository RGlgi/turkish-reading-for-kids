import React, { useState, useEffect } from 'react'
import KelimeData from './KelimeData'
import './KelimeTamamlama.css'
import correctSound from '../assets/sounds/correct.mp3'
import wrongSound from '../assets/sounds/wrong-answer.mp3'
import Confetti from 'react-confetti'
import playSoundIcon from '../assets/play-icon.png'
import homeIcon from '../assets/home-im.png'
import { useNavigate } from 'react-router-dom'

interface KelimeTamamlamaProps {
  onGoHome: () => void
}

const KelimeTamamlama: React.FC<KelimeTamamlamaProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [droppedLetter, setDroppedLetter] = useState<string | null>(null)
  const [shakeIndex, setShakeIndex] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [choices, setChoices] = useState<string[]>([])

  const wordData = KelimeData[currentIndex]

  useEffect(() => {
    const wrongLetters = ['B', 'M', 'S'].filter(
      (letter) => letter !== wordData.missingLetter
    )
    const allLetters = [wordData.missingLetter, ...wrongLetters.slice(0, 3)]
    const shuffled = allLetters.sort(() => Math.random() - 0.5)
    setChoices(shuffled)
  }, [currentIndex, wordData.missingLetter])

  const playWordSound = () => {
    const speech = new SpeechSynthesisUtterance(wordData.fullWord)
    speech.lang = 'tr-TR'
    speech.rate = 0.8
    window.speechSynthesis.speak(speech)
  }

  const handleChoiceClick = (letter: string, index: number) => {
    if (showConfetti) return // prevent clicking during confetti

    if (letter === wordData.missingLetter) {
      setDroppedLetter(letter)
      setShowConfetti(true)
      new Audio(correctSound).play()

      setTimeout(() => {
        setShowConfetti(false)
        nextWord()
      }, 4000)
    } else {
      setShakeIndex(index)
      new Audio(wrongSound).play()
      setTimeout(() => setShakeIndex(null), 500)
    }
  }

  const nextWord = () => {
    if (currentIndex < KelimeData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setGameFinished(true)
    }
    setDroppedLetter(null)
    setShakeIndex(null)
  }

  if (gameFinished) {
    return (
      <div className="kelime-wrapper1">
        <div className="game-wrapper">
          <Confetti />
          <div className="game-sorulari">
            <h2>Tebrikler! 🎉</h2>
            <p>Tüm kelimeleri başarıyla tamamladın!</p>
            <button className="home-button" onClick={handleHome}>
              Ana Sayfa
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="kelime-wrapper1">
      <img
        src={homeIcon}
        alt="home"
        className="home-button"
        onClick={handleHome}
      />
      <div className="game-wrapper">
        {showConfetti && <Confetti />}

        <div className="game-sorulari">
          <h2>Kelimeyi Tamamla</h2>

          <div className="question-box">
            <img
              src={playSoundIcon}
              alt="Kelimeyi Dinle"
              onClick={playWordSound}
              title="Kelimeyi Dinle"
            />

            <h1 style={{ marginBottom: '1rem' }}>
              {wordData.word.split('').map((letter, index) => (
                <span key={index}>
                  {letter === '_' ? (
                    <span className="drop-target">
                      {droppedLetter ? droppedLetter : '_'}
                    </span>
                  ) : (
                    letter
                  )}
                </span>
              ))}
            </h1>

            <div className="game-choices">
              {choices.map((letter, index) => (
                <div
                  key={index}
                  className={`game-choice ${
                    shakeIndex === index ? 'shake' : ''
                  }`}
                  onClick={() => handleChoiceClick(letter, index)}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KelimeTamamlama
