import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import navImg from '../assets/avatar1.png'
import './WelcomeOverlay.css'

const WelcomeOverlay: React.FC = () => {
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      await signInWithPopup(auth, provider)
      navigate('/main')
    } catch (error) {
      console.error('Google Sign-in Error:', error)
    }
  }

  const handleContinueAnyway = () => {
    navigate('/main')
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-box">
        <h1>Türkçe Okuyorum a Hoşgeldiniz!</h1>
        <img src={navImg} alt="Logo" className="welcome-logo" />
        <div className="button-group">
          <button className="google-button" onClick={handleGoogleSignIn}>
            Sign In with Google
          </button>
          <button className="continue-button" onClick={handleContinueAnyway}>
            websayfasina git
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeOverlay
