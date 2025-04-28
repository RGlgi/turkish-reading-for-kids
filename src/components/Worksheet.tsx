import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/back-im.png'
import './Worksheet.css'

interface WorksheetProps {
  onGoHome: () => void
}

const Worksheet: React.FC<WorksheetProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/GamesMenu')
    onGoHome()
  }

  const [favoriteColor, setFavoriteColor] = useState('')
  const [words, setWords] = useState(['', '', ''])

  return (
    <div>
      <div className="story-reader">
        <img
          src={backIcon}
          alt="home"
          className="home-button"
          onClick={handleBack}
        />
      </div>
      <div
        className="worksheet-container"
        style={{
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          fontFamily: 'Comic Sans MS, sans-serif',
        }}
      >
        <h1>Çalıșmalar 1</h1>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Ad: <input type="text" style={{ marginLeft: '0.5rem' }} />
          </label>
        </div>

        <h2>🖊️ Kelime Egzersizi</h2>

        <p>"A" ile başlayan 3 kelime yaz.:</p>
        {words.map((word, idx) => (
          <input
            key={idx}
            type="text"
            value={word}
            onChange={(e) => {
              const newWords = [...words]
              newWords[idx] = e.target.value
              setWords(newWords)
            }}
            style={{ display: 'block', margin: '0.5rem 0', width: '100%' }}
          />
        ))}

        <h2>🧹 Word Puzzle</h2>
        <p>Find and circle the words: BALL, CAT, DOG, PEN</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          {[
            'B',
            'A',
            'L',
            'L',
            'O',
            'N',
            'C',
            'A',
            'T',
            'B',
            'O',
            'Y',
            'D',
            'O',
            'G',
            'R',
            'U',
            'N',
            'P',
            'E',
            'N',
            'C',
            'I',
            'L',
          ].map((letter, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #aaa',
                padding: '0.5rem',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        <h2>✍️ Short Answer</h2>
        <p>En sevdigin rengi yazarmisin?</p>
        <input
          type="text"
          value={favoriteColor}
          onChange={(e) => setFavoriteColor(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
          ⭐ Good Job! ⭐
        </h2>
      </div>
    </div>
  )
}

export default Worksheet
