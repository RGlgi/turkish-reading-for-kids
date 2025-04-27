// src/components/GoogleAuth.tsx
import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebaseConfig'

const GoogleAuth: React.FC = () => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      alert(`Welcome, ${user.displayName}`)
    } catch (err) {
      console.error('Error during sign in:', err)
      alert('Sign in failed. Try again.')
    }
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-box">
        <img src="/giraffe.png" alt="Giraffe" className="welcome-image" />

        <div className="button-group">
          <button className="btn" onClick={signIn}>
            Sign Up with Google
          </button>
          <button className="btn" onClick={signIn}>
            Login with Google
          </button>
        </div>

        <button
          className="btn-continue"
          onClick={() => alert('Continue without login')}
        >
          Continue Anyway
        </button>
      </div>
    </div>
  )
}

export default GoogleAuth
