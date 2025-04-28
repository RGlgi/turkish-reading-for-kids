import React from 'react'
import { useNavigate } from 'react-router-dom'
import './GamesMenu.css'
import homeIcon from '../assets/home-im.png'

interface GamesMenuProps {
  onGoHome: () => void
}

const GamesMenu: React.FC<GamesMenuProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  return (
    <div className="ses-wrapper1">
      <img
        src={homeIcon}
        alt="home"
        className="home-button"
        onClick={handleHome}
      />
      <div className="games-menu-wrapper">
        <h1>Oyunlar</h1>
        <div className="games-list">
          <button
            onClick={() => navigate('/kelime-tamamlama')}
            className="game-button"
          >
            Kelime Tamamlama
          </button>
          <button
            onClick={() => navigate('/hafiza-oyunu')}
            className="game-button"
          >
            Hafıza Oyunu
          </button>
          <button
            onClick={() => navigate('/Worksheet')}
            className="game-button"
          >
            Kelime Puzzle
          </button>
        </div>
      </div>
    </div>
  )
}

export default GamesMenu
