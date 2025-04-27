import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './BuyukHarfler.css'
import homeIcon from '../assets/home-im.png'
import monsterImage from '../assets/ms-show-right.png'

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
]

const getRandomColor = () => {
  const colors = [
    '#f94144',
    '#f3722c',
    '#f9c74f',
    '#90be6d',
    '#43aa8b',
    '#577590',
    '#9b5de5',
    '#f15bb5',
    '#ff3318',
    '#f39d2c',
    '#e5f94f',
    '#a0ff58',
    '#44ffc7',
    '#3ba3ff',
    '#8724ff',
    '#c91982',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

interface BuyukHarflerProps {
  onGoHome: () => void
}

const BuyukHarfler: React.FC<BuyukHarflerProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const [buttonColors, setButtonColors] = useState<string[]>(
    Array(letters.length).fill('#ffeaa7')
  )
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  const clickSoundRef = useRef(new Audio(require('../assets/sounds/click.mp3')))

  const speakLetter = (letter: string, index: number) => {
    const speech = new SpeechSynthesisUtterance(letter.toLowerCase()) // FIX: lowercase for pure sound
    speech.lang = 'tr-TR'
    speech.rate = 0.8
    window.speechSynthesis.speak(speech)

    clickSoundRef.current.currentTime = 0
    clickSoundRef.current.play()

    const newColors = [...buttonColors]
    newColors[index] = getRandomColor()
    setButtonColors(newColors)

    setClickedIndex(index)
    setTimeout(() => setClickedIndex(null), 300)
  }

  return (
    <div className="harfler-wrapper1">
      <img
        src={homeIcon}
        alt="home"
        className="home-button"
        onClick={handleHome}
      />
      <div className="harfler-wrapper">
        <div className="harfler-content">
          <img src={monsterImage} alt="Monster" className="monster-image" />
          <div className="harfler-right-side">
            <h2>Büyük Harfler</h2>
            <div className="harfler-grid">
              {letters.map((letter, index) => (
                <button
                  key={index}
                  className={`harf-button ${
                    clickedIndex === index ? 'bounce' : ''
                  }`}
                  onClick={() => speakLetter(letter, index)}
                  style={{ backgroundColor: buttonColors[index] }}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyukHarfler
