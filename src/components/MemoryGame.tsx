import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import './MemoryGame.css'
import { useNavigate } from 'react-router-dom'
import homeIcon from '../assets/home-im.png'
import bground from '../assets/mg-bg.png'
import correctSound from '../assets/sounds/correct.mp3'

const letters = ['A', 'B', 'C', 'D', 'E', 'F']
const shuffledLetters = [...letters, ...letters].sort(() => Math.random() - 0.5)

interface MemoryGameProps {
  onGoHome: () => void
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const [cards] = useState(shuffledLetters)
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [matchedIndexes, setMatchedIndexes] = useState<number[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  const handleCardClick = (index: number) => {
    if (
      flippedIndexes.length === 2 ||
      flippedIndexes.includes(index) ||
      matchedIndexes.includes(index)
    )
      return
    setFlippedIndexes([...flippedIndexes, index])
  }

  useEffect(() => {
    if (flippedIndexes.length === 2) {
      const [firstIndex, secondIndex] = flippedIndexes
      if (cards[firstIndex] === cards[secondIndex]) {
        new Audio(correctSound).play()
        setMatchedIndexes((prev) => [...prev, firstIndex, secondIndex])
      }
      setTimeout(() => setFlippedIndexes([]), 1000)
    }
  }, [flippedIndexes, cards])

  useEffect(() => {
    if (matchedIndexes.length === cards.length) {
      setShowConfetti(true)
    }
  }, [matchedIndexes, cards.length])

  return (
    <div className="ses-wrapper1">
      <img
        src={homeIcon}
        alt="home"
        className="home-button"
        onClick={handleHome}
      />
      <div className="memory-wrapper">
        {showConfetti && <Confetti />}
        {showConfetti && <h1 className="congrats-text">Tebrikler! 🎉</h1>}
        <div className="memory-grid">
          {cards.map((letter, index) => {
            const isFlipped =
              flippedIndexes.includes(index) || matchedIndexes.includes(index)
            return (
              <div
                key={index}
                className={`memory-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
                style={{
                  backgroundImage: !isFlipped ? 'none' : `url(${bground})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {isFlipped ? letter : ''}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MemoryGame
