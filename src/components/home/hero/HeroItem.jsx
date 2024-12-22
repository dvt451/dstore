import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from "react-icons/fi";

export default function HeroItem({image,product,description,buttonText,buttonLink,linkIcon,linkNameClass}) {
  return (
    <div className="hero__item hero-item hv-flash">
      <Link style={{backgroundImage: image}} to={`product/${product.id}`} className="hero-item__link-layer"></Link>
      <div className='hero-item__content'>
        <h3>{product.name}</h3>
        <p>{description}</p>
        <div className='no-extend'>
          <Link className={linkNameClass} to={buttonLink}>{buttonText}{linkIcon && <FiArrowRight />}</Link>
        </div>
      </div>
    </div>
  )
}