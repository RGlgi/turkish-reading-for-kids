import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './StoryReader.css'
import homeIcon from '../assets/home-im.png'

interface Song {
  id: number
  title: string
  videoUrl: string // ✅ Add video URL field to your SongData
}

interface SongReaderProps {
  onGoHome: () => void
}

const SongReader: React.FC<SongReaderProps> = ({ onGoHome }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const song = location.state as Song

  const handleHome = () => {
    navigate('/songlist')
    onGoHome()
  }

  return (
    <div className="story-reader">
      <img
        src={homeIcon}
        alt="home"
        className="home-button"
        onClick={handleHome}
      />
      <h2>{song.title}</h2>
      <div className="story-words">
        <div className="video-container">
          <iframe
            width="100%"
            height="315"
            src={song.videoUrl}
            title={song.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default SongReader
