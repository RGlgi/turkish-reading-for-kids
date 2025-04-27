// coloring-outline.tsx
import React from 'react'

const ColoringOutline = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<SVGElement>) => void
}) => (
  <svg
    width="500"
    height="500"
    viewBox="0 0 500 500"
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="..." fill="white" stroke="black" strokeWidth="2" />
    {/* more paths... */}
  </svg>
)

export default ColoringOutline
