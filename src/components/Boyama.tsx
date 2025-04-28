import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Boyama.css'
import coloring1 from '../assets/coloring/coloring1.png'
import coloring2 from '../assets/coloring/coloring2.png'
import coloring3 from '../assets/coloring/coloring3.png'
import coloring4 from '../assets/coloring/coloring4.png'
import coloring5 from '../assets/coloring/coloring5.png'
import coloring6 from '../assets/coloring/coloring6.png'
import coloring7 from '../assets/coloring/coloring7.png'
import coloring8 from '../assets/coloring/coloring8.png'
import coloring9 from '../assets/coloring/coloring9.png'
import homeIcon from '../assets/home-im.png'

const coloringImages = [
  coloring1,
  coloring2,
  coloring3,
  coloring4,
  coloring5,
  coloring6,
  coloring7,
  coloring8,
  coloring9,
]

const colors = [
  '#f94144',
  '#f3722c',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#577590',
  '#3c0c0d',
  '#f32ce2',
  '#a44ff9',
  '#03d5ff',
  '#000000',
  '#505860',
]

const getRandomImage = () =>
  coloringImages[Math.floor(Math.random() * coloringImages.length)]

interface BoyamaProps {
  onGoHome: () => void
}

const Boyama: React.FC<BoyamaProps> = ({ onGoHome }) => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/main')
    onGoHome()
  }

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [selectedColor, setSelectedColor] = useState('#f94144')
  const [isDrawing, setIsDrawing] = useState(false)
  const [imageSrc, setImageSrc] = useState(getRandomImage())

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = imageSrc
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
  }, [imageSrc])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      setIsDrawing(true)

      const clientX =
        (e as TouchEvent).touches?.[0]?.clientX ?? (e as MouseEvent).clientX
      const clientY =
        (e as TouchEvent).touches?.[0]?.clientY ?? (e as MouseEvent).clientY

      const rect = canvas.getBoundingClientRect()
      ctx.beginPath()
      ctx.moveTo(clientX - rect.left, clientY - rect.top)
    }

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return

      const clientX =
        (e as TouchEvent).touches?.[0]?.clientX ?? (e as MouseEvent).clientX
      const clientY =
        (e as TouchEvent).touches?.[0]?.clientY ?? (e as MouseEvent).clientY

      const rect = canvas.getBoundingClientRect()

      ctx.strokeStyle = selectedColor
      ctx.lineWidth = 8
      ctx.lineCap = 'round'

      ctx.lineTo(clientX - rect.left, clientY - rect.top)
      ctx.stroke()
    }

    const stopDrawing = () => {
      setIsDrawing(false)
      ctx.closePath()
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mouseout', stopDrawing)

    canvas.addEventListener('touchstart', startDrawing, { passive: false })
    canvas.addEventListener('touchmove', draw, { passive: false })
    canvas.addEventListener('touchend', stopDrawing)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', draw)
      canvas.removeEventListener('mouseup', stopDrawing)
      canvas.removeEventListener('mouseout', stopDrawing)

      canvas.removeEventListener('touchstart', startDrawing)
      canvas.removeEventListener('touchmove', draw)
      canvas.removeEventListener('touchend', stopDrawing)
    }
  }, [isDrawing, selectedColor])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const img = new Image()
      img.src = imageSrc
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }
  }

  return (
    <div className="boyama-wrapper1">
      <img
        src={homeIcon}
        alt="home"
        className="home-button"
        onClick={handleHome}
      />
      <div>
        <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Boyama</h2>

        <button
          onClick={() => setImageSrc(getRandomImage())}
          style={{
            display: 'block',
            margin: '1rem auto',
            padding: '0.6rem 1.2rem',
            background: '#90be6d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Yeni Resim 🎨
        </button>

        <button
          onClick={clearCanvas}
          style={{
            display: 'block',
            margin: '0 auto 1rem',
            padding: '0.6rem 1.2rem',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Temizle 🧼
        </button>

        <div className="boyama-wrapper">
          <div className="color-palette">
            {colors.map((color, index) => (
              <div
                key={index}
                className="color-box"
                style={{
                  backgroundColor: color,
                  border: selectedColor === color ? '2px solid black' : 'none',
                }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>

          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="coloring-canvas"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Boyama
