import React from 'react'
import { useFilter } from '../../../shared/hooks/FilterProvider'

export default function PriceFilter() {
  const {
    priceRange,
    handlePriceInputChange
  } = useFilter()
  return (
    <div>
    <h3>Price</h3>
    <div className="price-ranges">
      <label>
        <span>Min:</span>
        <input
          type="number"
          name="min"
          value={priceRange.min}
          onChange={handlePriceInputChange}
          placeholder="Min price"
        />
      </label>
      <label>
        <span>Max:</span>
        <input
          type="number"
          name="max"
          value={priceRange.max}
          onChange={handlePriceInputChange}
          placeholder="Max price"
        />
      </label>
    </div>  
  </div>
  )
}
