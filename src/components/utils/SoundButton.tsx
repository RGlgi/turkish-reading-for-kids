import React from 'react'
import { Speak } from './Speak'

interface SoundButtonProps {
  text: string
  className?: string
  style?: React.CSSProperties
  onClickExtra?: () => void // <-- ADD THIS LINE
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  text,
  className,
  style,
  onClickExtra,
}) => {
  const handleClick = () => {
    Speak(text)
    if (onClickExtra) {
      onClickExtra() // <-- CALL if provided
    }
  }

  return (
    <button className={className} style={style} onClick={handleClick}>
      {text}
    </button>
  )
}
