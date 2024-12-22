import React, { useState } from 'react';
import { useFilter } from '../../shared/hooks/FilterProvider';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import SearchCard from '../card/SearchCard';
import NotFound from './NotFound';
import { products } from '../../shared/data/products';

export default function Search() {
  const { setSearchTerm,setCurrentPage,setLoading, resetAll } = useFilter();
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const [headerSearchTerm, setHeaderSearchTerm] = useState('')

	const filteredProducts = products.filter((product) => {
			const matchesSearch =
			  !headerSearchTerm ||
			  product.name.toLowerCase().includes(headerSearchTerm.toLowerCase()) ||
			  product.brand.toLowerCase().includes(headerSearchTerm.toLowerCase()) ||
			  product.category.toLowerCase().includes(headerSearchTerm.toLowerCase());
			return (
			  matchesSearch
			);
		 });

  const handleSearchChange = (e) => {
	setCurrentPage(1)
	setHeaderSearchTerm(e.target.value);
 };

  const handleInputChange = (e) => {
    handleSearchChange(e); // Pass the event to handleSearchChange

    // Set focus state based on input value
    if (e.target.value.trim() === '') {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  };

  const searchInit = ()=>{
	navigate('/shop'); // Navigate to /shop on Enter
	setLoading(true)
	setCurrentPage(1)
	setSearchTerm(headerSearchTerm)
	setIsFocused(false);
	setTimeout(() => {
	  setLoading(false)
	}, 500);
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && headerSearchTerm.length > 0) {
		searchInit()
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.search')) {
      setIsFocused(false); // Remove focus state when clicking outside the container
    }
  };

  // Add event listener for clicks outside the search container
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="search">
      <div className={`search__bar`}>
        <input
          type="text"
          placeholder="Search products..."
          value={headerSearchTerm}
          onChange={handleInputChange} // Use the updated handleInputChange
          onKeyDown={handleKeyDown} // Add onKeyDown event listener
        />
        <button onClick={searchInit}><CiSearch /></button>
      </div>
      {isFocused && (
        <div className="search__products search-products">
          {filteredProducts.length < 1 ? 
            <NotFound />
            :
            <>
              <div className="search-products__top">
              <div className="search-products__quantity">
                <span>Products:</span>
                <span>{filteredProducts.length} item(s) found</span>
              </div>
            </div>
            <div className="search-products__list">
              {filteredProducts.slice(0, 5).map((item, i) => (
                <SearchCard product={item} searchTerm={headerSearchTerm} key={i}/>
              ))}
            </div>
            </>}
        </div>
      )}
    </div>
  );
}
