import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PlayIcon from '../assets/play-icon.png'
import PauseIcon from '../assets/pause.png'
import './StoryReader.css'

interface Story {
  id: number
  title: string
  image: string
  description: string
  content: string
}

interface StoryReaderProps {
  onGoHome: () => void
}

const StoryReader: React.FC<StoryReaderProps> = ({ onGoHome }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const story = location.state as Story

  const [soundEnabled, setSoundEnabled] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

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
    navigate('/storylist')
    onGoHome()
  }

  const playWord = (word: string) => {
    if (!soundEnabled) return

    const speech = new SpeechSynthesisUtterance(word)

    const turkishVoice = voices.find((voice) => voice.lang === 'tr-TR')
    if (turkishVoice) {
      speech.voice = turkishVoice
    } else {
      speech.lang = 'tr-TR'
    }

    speech.rate = 0.8
    window.speechSynthesis.cancel() // ✅ Cancel any previous speech
    window.speechSynthesis.speak(speech)
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
    window.speechSynthesis.cancel() // ✅ Immediately stop reading if user turns sound off
  }

  const sentences = story.content
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0)

  return (
    <div className="story-reader">
      {/* 🏠 Home Button */}
      <button className="home-button" onClick={handleHome}>
        MASALLAR
      </button>
      <h2>{story.title}</h2>

      <button className="sound-toggle-button" onClick={toggleSound}>
        <img
          src={soundEnabled ? PauseIcon : PlayIcon}
          alt={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
          className="sound-icon"
        />
      </button>

      <div className="story-words">
        {sentences.map((sentence, idx) => (
          <div className="sentence-row" key={idx}>
            {sentence.split(' ').map((word, widx) => (
              <button
                key={widx}
                className="story-word"
                onMouseEnter={() => playWord(word)}
              >
                {word}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StoryReader
