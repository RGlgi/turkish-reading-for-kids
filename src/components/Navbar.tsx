import React, { useState } from 'react'
import './Navbar.css'
import navImg from '../assets/avatar1.png'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

interface Props {
  userName: string | null
}

const Navbar: React.FC<Props> = ({ userName }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const handleUserNameClick = () => {
    setShowDropdown((prev) => !prev)
  }
  const handleLogout = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      localStorage.clear()
      setShowDropdown(false)
      navigate('/login') // 👈 redirect using navigate (NOT window.location.href)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  return (
    <header className="header">
      <div className="logo">
        <img src={navImg} alt="logo" />
        <h1>Türkçe Okuyorum</h1>
      </div>

      <nav>
        <ul>
          <li>
            <div className="navbar-user">
              {userName ? (
                <span className="user-name" onClick={handleUserNameClick}>
                  {userName}
                </span>
              ) : (
                <span className="user-name">Guest</span>
              )}
              {showDropdown && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => alert('Profil sayfası yakında! 🚀')}
                  >
                    Profilim
                  </button>
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
