import React from 'react'
import './StoryReader.css'
import { useNavigate } from 'react-router-dom'
import SongData from './SongData'
import homeIcon from '../assets/home-im.png'
import music_icon from '../assets/music-icon.png'

interface SongListProps {
  onGoHome: () => void
}

const SongList: React.FC<SongListProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const openSong = (song: (typeof SongData)[0]) => {
    navigate(`/song-read/${song.id}`, { state: song })
  }

  return (
    <div className="ses-wrapper1">
      <img
        src={homeIcon}
        alt="home"
        className="home-button"
        onClick={handleHome}
      />
      <div className="story-list">
        <h2>Şarkılar</h2>
        <div className="story-cards">
          {SongData.map((song) => (
            <div className="story-card" key={song.id}>
              <div className="story-card-content">
                <div className="story-text">
                  <h3>{song.title}</h3>
                  <img src={music_icon} alt="music"></img>
                </div>
                <button className="read-button" onClick={() => openSong(song)}>
                  Dinle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SongList
