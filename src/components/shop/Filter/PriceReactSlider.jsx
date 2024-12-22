import React from 'react';
import ReactSlider from 'react-slider';
import { useFilter } from '../../../shared/hooks/FilterProvider';

const PriceReactSlider = () => {
  const { priceRange, handleRangePriceChange, maxProductPrice, setCurrentPage, setLoading } = useFilter()
  const handlePriceChange = handleRangePriceChange;
  return (
    <div>
      <ReactSlider
        className="input-range"
        min={0}
        max={maxProductPrice}
        value={[Number(priceRange.min), Number(priceRange.max)]}
        onChange={(values) => {
          setLoading(true)
          handlePriceChange({ min: values[0], max: values[1] })
          setCurrentPage(1)
          setTimeout(() => {
            setLoading(false)
          }, 500);
        }}
        ariaLabel={['Lower price', 'Upper price']}
      />
      <div className="price-ranges">
        <span>${priceRange.min || 0}</span> - <span>${priceRange.max}</span>
      </div>
    </div>
  );
};

export default PriceReactSlider;
