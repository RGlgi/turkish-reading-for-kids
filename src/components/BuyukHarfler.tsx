import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BuyukHarfler.css'
import homeIcon from '../assets/home-im.png'
import monsterImage from '../assets/ms-show-right.png'
// import { Speak } from './utils/Speak'
import { SoundButton } from './utils/SoundButton'

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

  const [buttonColors, setButtonColors] = useState<string[]>(
    Array(letters.length).fill('#ffeaa7')
  )
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const handleLetterClick = (letter: string, index: number) => {
    // DO NOT call Speak(letter) here — SoundButton already does it
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
        alt="Ana Sayfa"
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

export default BuyukHarfler
