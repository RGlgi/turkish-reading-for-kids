import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import KelimeTamamlama from './components/KelimeTamamlama'
import MainContent from './components/MainContent'
import WelcomeOverlay from './components/WelcomeOverlay'
import BuyukHarfler from './components/BuyukHarfler'
import StoryReader from './components/StoryReader'
import StoryList from './components/StoryList'
import SongReader from './components/SongReader'
import SongList from './components/SongList'
import GamesMenu from './components/GamesMenu'
import MemoryGame from './components/MemoryGame'
import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email || 'Guest')
      } else {
        setUserName(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/kelime-tamamlama"
          element={<KelimeTamamlama onGoHome={() => {}} />}
        />
        <Route path="/" element={<WelcomeOverlay />} />
        <Route path="/login" element={<WelcomeOverlay />} />
        <Route path="/main" element={<MainContent userName={userName} />} />
        <Route
          path="/buyukharfler"
          element={<BuyukHarfler onGoHome={() => {}} />}
        />

        <Route
          path="/story-read/:id"
          element={<StoryReader onGoHome={() => {}} />}
        />
        <Route path="/storylist" element={<StoryList onGoHome={() => {}} />} />
        <Route
          path="/song-read/:id"
          element={<SongReader onGoHome={() => {}} />}
        />
        <Route path="/songlist" element={<SongList onGoHome={() => {}} />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/games" element={<GamesMenu onGoHome={() => {}} />} />
        <Route
          path="/kelime-tamamlama"
          element={<KelimeTamamlama onGoHome={() => {}} />}
        />
        <Route
          path="/hafiza-oyunu"
          element={<MemoryGame onGoHome={() => {}} />}
        />
      </Routes>
    </Router>
  )
}

export default App
