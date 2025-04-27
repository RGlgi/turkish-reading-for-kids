import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Boyama.css'
import coloring1 from '../assets/coloring/coloring1.png'
import coloring2 from '../assets/coloring/coloring2.png'
import coloring3 from '../assets/coloring/coloring3.png'
import coloring4 from '../assets/coloring/coloring4.png'
import coloring5 from '../assets/coloring/coloring5.png'
import homeIcon from '../assets/home-im.png'

const coloringImages = [coloring1, coloring2, coloring3, coloring4, coloring5]
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
  const [imageSrc, setImageSrc] = useState(getRandomImage()) // ✅ useState at top level

  // 🖼️ Load image whenever imageSrc changes
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = new Image()
    img.src = imageSrc
    img.onload = () => {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height) // clear before drawing new
      ctx?.drawImage(img, 0, 0, canvas!.width, canvas!.height)
    }
  }, [imageSrc]) // ✅ re-run when imageSrc changes

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.fillStyle = selectedColor
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fill()
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
          onClick={() => {
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
          }}
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
            {colors.map((color, i) => (
              <div
                key={i}
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
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="coloring-canvas"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Boyama
