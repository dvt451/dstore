import React from 'react'
import { useFilter } from '../../../shared/hooks/FilterProvider'

export default function RadioFilter() {
  const {
    filters,
    handleAvailabilityChange
  } = useFilter()
  return (
      <div className='radios'>
        <h3>Availability</h3>
        <div className="checkbox">
          <input
            id='stock_1'
            className="checkbox__input"
            type="radio"
            name="stock"
            value="in-stock"
            checked={filters.availability === "in-stock"}
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="stock_1" className="checkbox__label">
            <span className="checkbox__text">In stock</span>
          </label>
        </div>
        <div className="checkbox">
          <input
            id='stock_2'
            className="checkbox__input"
            type="radio"
            name="stock"
            value="out-of-stock" // Use value for filtering
            checked={filters.availability === "out-of-stock"}
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="stock_2" className="checkbox__label">
            <span className="checkbox__text">Out of stock</span>
          </label>
        </div>
        <div className="checkbox">
          <input
            id='stock_3'
            className="checkbox__input"
            type="radio"
            name="stock"
            value="All" // Use value for filtering
            checked={filters.availability === "All"}
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="stock_3" className="checkbox__label">
            <span className="checkbox__text">All</span>
          </label>
        </div>
      </div>
  )
}
