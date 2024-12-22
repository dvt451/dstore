import React from 'react'
import { useFilter } from '../../../shared/hooks/FilterProvider'

export default function SearchBar() {
    const {
        searchTerm,
        handleSearchChange
    } = useFilter()
  return (
    <div className="search-bar">
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>
  )
}
