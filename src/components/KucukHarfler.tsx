import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './BuyukHarfler.css' // you can use same css as BuyukHarfler
import monsterImage from '../assets/ms-show-right.png'
import homeIcon from '../assets/home-im.png'

const letters = [
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

const getRandomColor = () => {
  const colors = [
    '#ff4343',
    '#43a1ff',
    '#ffdc68',
    '#30f8bf',
    '#fc2f77',
    '#685dfb',
    '#ff5d39',
    '#37ffff',
    '#fffa68',
    '#30f8bf',
    '#fc2faa',
    '#9f5dfb',
    '#ff8839',
    '#37f8ff',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

interface KucukHarflerProps {
  onGoHome: () => void
}

const KucukHarfler: React.FC<KucukHarflerProps> = ({ onGoHome }) => {
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
    const speech = new SpeechSynthesisUtterance(letter) // letter is already lowercase!
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
            <h2>Küçük Harfler</h2>
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

export default KucukHarfler
