import React from 'react'
import Confetti from 'react-confetti'

interface FeedbackBoxProps {
  feedback: 'correct' | 'wrong' | null
  showConfetti: boolean
}

export const FeedbackBox: React.FC<FeedbackBoxProps> = ({
  feedback,
  showConfetti,
}) => {
  return (
    <>
      {showConfetti && <Confetti />}
      {feedback === 'correct' && <p className="feedback">✅ Doğru!</p>}
      {feedback === 'wrong' && <p className="feedback">❌ Yanlış!</p>}
    </>
  )
}
