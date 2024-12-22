import React from 'react'
import { useFilter } from '../../../shared/hooks/FilterProvider'

export default function NoProductsFound() {
  const {resetFilters} = useFilter()
  return (
    <div className='no-products-found'>
        <p>No products found</p>
        <button onClick={resetFilters} className="reset-button">
              <span>Reset Filters</span>
        </button>
    </div>
  )
}
