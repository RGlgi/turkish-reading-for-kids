import React, { useState } from 'react'
import { CombineLetters } from './CombineLetters'
import { QuizCombineLetters } from './QuizCombineLetters'
import { CombineSyllables } from './CombineSyllables'
import './Heceler.css'
import homeIcon from '../assets/home-im.png'
import { useNavigate } from 'react-router-dom'

interface HecelerProps {
  onGoHome: () => void
}

const Heceler: React.FC<HecelerProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }
  const [activeSection, setActiveSection] = useState<string>('')

  return (
    <div className="ses-wrapper1">
      <img
        src={homeIcon}
        alt="home"
        className="home-button"
        onClick={handleHome}
      />
      <div className="heceler-wrapper">
        <h2>Heceler</h2>

        <div className="heceler-box">
          <div className="heceler-buttons">
            <button onClick={() => setActiveSection('CombineLetters')}>
              Harfleri Birleştir
            </button>
            <button onClick={() => setActiveSection('quizLetters')}>
              Hece Quiz
            </button>
            <button onClick={() => setActiveSection('combineSyllables')}>
              Heceleri Birleştir
            </button>
          </div>

          {/* Render Sections */}
          {activeSection === 'CombineLetters' && <CombineLetters />}
          {activeSection === 'quizLetters' && <QuizCombineLetters />}
          {activeSection === 'combineSyllables' && <CombineSyllables />}
          {activeSection === 'quizSyllables' && (
            <p>Quiz for Syllables (coming soon)</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Heceler
