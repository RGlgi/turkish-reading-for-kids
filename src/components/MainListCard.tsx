import MainListData from './MainListData'
import MainList from './MainList'
import React from 'react'

type Props = {
  onCardClick: (name: string) => void
}

const MainListCard = ({ onCardClick }: Props) => {
  return (
    <section className="MListWrapper">
      <section className="MList">
        {MainListData.map((t) => {
          const { img, name, id, bgColor } = t
          return (
            <MainList
              key={id}
              img={img}
              name={name}
              bgColor={bgColor}
              onClick={() => onCardClick(name)}
            />
          )
        })}
      </section>
    </section>
  )
}

export default MainListCard
