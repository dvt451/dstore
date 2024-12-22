import React from 'react'
import { Link } from 'react-router-dom'

export default function AdvantagesGrid() {
  return (
    <div className='advantages__grid advantages-grid'>
        <div className="advantages-grid__item advantages-grid-main">
            <Link style={{backgroundImage: `url(/img/banners/banner3.jpeg)`}} to={'/shop?category=Accessories'} className="advantages-grid__link-layer"></Link>
            <div className='advantages-grid__content'>
                <h3 className="advantages-grid__title">Accesories</h3>
                <p className="advantages-grid__text">Integrated Control and Mode</p>
                <Link to={'/shop?category=Accessories'} className="advantages-grid__link button">See Category</Link>
            </div>
        </div>
        <div className="advantages-grid__item advantages-grid-secondary hv-flash">
            <Link style={{backgroundImage: `url(/img/banners/banner4.jpeg)`}} to={'/shop'} className="advantages-grid__link-layer"></Link>
            <div className='advantages-grid__content'>
                <h3 className="advantages-grid__title">Accesories</h3>
                <p className="advantages-grid__text">Integrated Control and Mode</p>
                <div className='no-extend'><Link to={'/shop'} className="advantages-grid__link button">Shop now</Link></div>
            </div>
        </div>
        <div className="advantages-grid__item advantages-grid-secondary hv-flash">
            <Link style={{backgroundImage: `url(/img/banners/banner5.jpeg)`}} to={'/shop'} className="advantages-grid__link-layer"></Link>
            <div className='advantages-grid__content'>
                <h3 className="advantages-grid__title">Accesories</h3>
                <p className="advantages-grid__text">Integrated Control and Mode</p>
                <div className='no-extend'><Link to={'/shop'} className="advantages-grid__link button">Shop now</Link></div>
            </div>
        </div>
    </div>
  )
}
