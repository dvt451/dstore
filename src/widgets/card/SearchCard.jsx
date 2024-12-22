import React from 'react'
import { Link } from 'react-router-dom';

export default function SearchCard({product,searchTerm}) {
    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text; // If no search term, return the text as is
      
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);
      
        return parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className="highlight">{part}</span>
          ) : (
            part
          )
        );
      };
  return (
    <Link to={`/product/${product.id}`} className="search-product-card">
      <div className="search-product-card__image -ibg--contain">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="search-product-card__details">
        <div className="search-product-card__name">{highlightText(product.name,searchTerm)}</div>
        <div className="search-product-card__detail">
          <span className="search-product-card__stock">
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </span><span className='search-product-card__text-seperator'> | </span> 
          <span className="search-product-card__category"> Category: {highlightText(product.category,searchTerm)}
          </span>
        </div>
      </div>
    </Link>
  )
}
