import React from 'react'

type MainListProps = {
  img: string
  name: string
  bgColor: string
  onClick: () => void
}

const MainList: React.FC<MainListProps> = ({ img, name, bgColor, onClick }) => {
  return (
    <article
      className="card"
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
      }}
    >
      <img className="card-image" src={img} alt={name} />
      <h2>{name}</h2>
    </article>
  )
}

export default MainList
