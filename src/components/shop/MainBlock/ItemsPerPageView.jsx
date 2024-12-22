import React, { useEffect, useRef, useState } from 'react';
import { useFilter } from '../../../shared/hooks/FilterProvider';

export default function ItemsPerPageView() {
   const {
      setLoading,
      setProductsPerPage,
      itemPerPageActive,
      setItemPerPageActive,
      setCurrentPage,
      ProductsPerPageOptions,
   } = useFilter()

   const selectRef = useRef(null);
   const [selectActive, setSelectActive] = useState(false);
   const options = ProductsPerPageOptions;

   const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
         setSelectActive(false);
      }
   };

   useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, []);

   const handleOptionSelect = (i) => {
      setLoading(true)
      setSelectActive(false);
      setProductsPerPage(options[i]);
      setItemPerPageActive(i)
      setCurrentPage(1)
      
      setTimeout(() => {
         setLoading(false)
       }, 500);
   };

   return (
      <div ref={selectRef} className={`select${!selectActive ? "" : ' _active'}`}>
         <button className={`option selected${!selectActive ? "" : ' option-open'}`} onClick={() => setSelectActive(!selectActive)}>
            <div className="selected-content">
               <div className="selected-content-icon"></div>
               <span className="selected-text">Show: {options[itemPerPageActive]}</span>
            </div>
            <span className={selectActive === false ? "selected-icon" : 'selected-icon active'}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none">
                  <path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path>
               </svg>
            </span>
         </button>
         <div className={selectActive === false ? "option-list" : 'option-list option-open'}>
            {options.map((item, i) => (
               <button 
                  key={i}
                  className={`option${itemPerPageActive === i ? " _active" : ""}`}
                  onClick={() =>{
                        handleOptionSelect(i)
                      }}>
                  {item}
               </button>
            ))}
         </div>
      </div>
   );
}
