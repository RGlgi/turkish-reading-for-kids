import React, { useState } from 'react'
import './MainContent.css'
import Navbar from './Navbar'
import Footer from './Footer'
import MainListCard from './MainListCard'
import BuyukHarfler from './BuyukHarfler'
import KucukHarfler from './KucukHarfler'
import StoryList from './StoryList'
import SongList from './SongList'
import Boyama from './Boyama'
import SesSorulari from './SesSorulari'
import Heceler from './Heceler'
import { QuizWord } from './QuizWord'
import GamesMenu from './GamesMenu'

interface MainContentProps {
  userName: string | null
}

const MainContent: React.FC<MainContentProps> = ({ userName }) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const handleCardClick = (sectionName: string) => {
    setSelectedSection(sectionName)
  }

  console.log('🎯 selectedSection:', selectedSection)

  return (
    <div className="main-content">
      <Navbar userName={userName} />

      {!selectedSection && (
        <>
          <MainListCard onCardClick={handleCardClick} />
          {/* <SecondMain /> */}
        </>
      )}

      {selectedSection === 'Büyük Harfler' && (
        <BuyukHarfler onGoHome={() => setSelectedSection(null)} />
      )}
      {selectedSection === 'Küçük Harfler' && (
        <KucukHarfler onGoHome={() => setSelectedSection(null)} />
      )}
      {selectedSection === 'Hikayeler' && (
        <StoryList onGoHome={() => setSelectedSection(null)} />
      )}
      {selectedSection === 'Boyama' && (
        <Boyama onGoHome={() => setSelectedSection(null)} />
      )}
      {selectedSection === 'Ses Sorulari' && (
        <SesSorulari onGoHome={() => setSelectedSection(null)} />
      )}
      {selectedSection === 'Heceler' && (
        <Heceler onGoHome={() => setSelectedSection(null)} />
      )}
      {selectedSection === 'Kelimeler' && (
        <QuizWord onGoHome={() => setSelectedSection(null)} />
      )}

      {selectedSection === 'Oyunlar' && (
        <GamesMenu onGoHome={() => setSelectedSection(null)} />
      )}

      {/* Şarkılar opens SongList (not KelimeTamamlama) */}
      {selectedSection === 'Şarkılar' && (
        <SongList onGoHome={() => setSelectedSection(null)} />
      )}

      <Footer />
    </div>
  )
}

export default MainContent
