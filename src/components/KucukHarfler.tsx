import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BuyukHarfler.css' // reuse same CSS
import monsterImage from '../assets/ms-show-right.png'
import homeIcon from '../assets/home-im.png'
import { Speak } from './utils/Speak'
import { SoundButton } from './utils/SoundButton'

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

  const [buttonColors, setButtonColors] = useState<string[]>(
    Array(letters.length).fill('#ffeaa7')
  )
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const handleLetterClick = (letter: string, index: number) => {
    Speak(letter)

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
                <SoundButton
                  key={index}
                  text={letter}
                  className={`harf-button ${
                    clickedIndex === index ? 'bounce' : ''
                  }`}
                  onClickExtra={() => handleLetterClick(letter, index)}
                  style={{ backgroundColor: buttonColors[index] }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KucukHarfler
