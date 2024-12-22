import React from 'react'

export default function HomeLabel({item}) {
  return (
    <div className="home-label">
        {item.icon}
        <p>{item.text}</p>
    </div>
  )
}
