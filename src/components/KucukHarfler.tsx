import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './BuyukHarfler.css' // you can reuse the same CSS
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

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [buttonColors, setButtonColors] = useState<string[]>(
    Array(letters.length).fill('#ffeaa7')
  )
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)
    }

    loadVoices()

    if (typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const speakLetter = (letter: string, index: number) => {
    const speech = new SpeechSynthesisUtterance(letter)

    const turkishVoice = voices.find((voice) => voice.lang === 'tr-TR')
    if (turkishVoice) {
      speech.voice = turkishVoice
    } else {
      speech.lang = 'tr-TR' // fallback to setting Turkish language
    }
    speech.rate = 0.8
    window.speechSynthesis.speak(speech)

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
