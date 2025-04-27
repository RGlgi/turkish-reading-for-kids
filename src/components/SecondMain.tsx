import React from 'react'
import './SecondMain.css'
import img1 from '../assets/ms-question.png'
import img2 from '../assets/printable2.png'
import img3 from '../assets/ms-singing.png'

const data = [
  {
    title: 'Çocuklar İçin Türkçe Okuma Quizleri Hazır!',
    description: `Çocukların okuma sevgisini artıracak, anlama becerilerini geliştirecek eğlenceli ve öğretici quizler burada.`,
    image: img1,
  },
  {
    title: 'Çıktı Alınabilecek Dokümanlarımız Var!',
    description: `• Yazdırılabilir okuma metinleri
• Sorulu etkinlik sayfaları
• Renkli ya da sade versiyon seçenekleri`,
    image: img2,
  },
  {
    title: 'Birlikte Şarkılar Söylesek mi?',
    description: `Öğrenmenin en keyifli yollarından biri: şarkılar!
Haydi, sesi aç! Türkçeyle ritmi yakalayalım! `,
    image: img3,
  },
]

const SecondMain = () => {
  return (
    <div className="second-main">
      {data.map((item, index) => {
        const isImageRight = index % 2 === 0
        return (
          <div
            key={index}
            className={`row-container ${isImageRight ? 'reverse' : ''}`}
          >
            <img src={item.image} alt={item.title} className="row-image" />
            <div className="text-content">
              <h2 className="row-title">{item.title}</h2>
              <p className="row-description">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SecondMain
