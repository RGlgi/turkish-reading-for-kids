import React from 'react'
import './StoryReader.css'
import { useNavigate } from 'react-router-dom'
import StoryData from './StoryData'
import homeIcon from '../assets/home-im.png'

interface StorylistProps {
  onGoHome: () => void
}

const StoryList: React.FC<StorylistProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const openStory = (story: (typeof StoryData)[0]) => {
    navigate(`/story-read/${story.id}`, { state: story }) // ✅ go to new reader
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
        {/* 🏠 Home Button */}

        <h2>Masallar</h2>
        <div className="story-cards">
          {StoryData.map((story) => (
            <div className="story-card" key={story.id}>
              <div className="story-card-content">
                <img src={story.image} alt={story.title} />
                <div className="story-text">
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>
                <button
                  className="read-button"
                  onClick={() => openStory(story)}
                >
                  Oku
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoryList
