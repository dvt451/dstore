import React from 'react'
import AdvantagesLabels from './AdvantagesLabels'
import AdvantagesGrid from './AdvantagesGrid'
import Deals from './Deals'

export default function Advantages() {
    
  return (
    <div className='advantages'>
        <div className="advantages__container">
            <h2 className="home-title">Our Advantages</h2>
            <AdvantagesLabels />
            <div className='advantages__mian-content'>
              <Deals />
              <AdvantagesGrid />
            </div>
        </div>
    </div>
  )
}
