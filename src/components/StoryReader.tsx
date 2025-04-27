import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PlayIcon from '../assets/play-icon.png'
import PauseIcon from '../assets/pause.png'
import './StoryReader.css'
import { useNavigate } from 'react-router-dom'

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

  const handleHome = () => {
    navigate('/storylist')
    onGoHome()
  }
  const location = useLocation()
  const story = location.state as Story

  const [soundEnabled, setSoundEnabled] = useState(false)

  const playWord = async (word: string) => {
    if (!soundEnabled) return
    try {
      const response = await fetch('http://localhost:5050/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: word }),
      })
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      await audio.play().catch((err) => console.log('Autoplay block', err))
    } catch (err) {
      console.error('Error playing word', err)
    }
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  // Split by sentences (. ? !) then split sentences by words
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
