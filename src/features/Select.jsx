import React, { useEffect, useRef, useState } from 'react';

export default function Select({ arrayList, onSelect,selectOption, setSelectOption }) {
   const selectRef = useRef(null);
   const options = arrayList;
   const [active, setActive] = useState(false);

   const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
         setActive(false);
      }
   };

   useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, []);

   const handleOptionClick = (i) => {
      setSelectOption(i);
      setActive(false);
      onSelect(i); // Notify parent about the selected option
   };

   return (
      <div ref={selectRef} className="select">
         <button className={`option selected${!active ? "" : ' option-open'}`} onClick={() => setActive(!active)}>
            <div className="selected-content">
               <div className="selected-content-icon"></div>
               <span className="selected-text">{options[selectOption]}</span>
            </div>
            <span className={!active ? "selected-icon" : 'selected-icon active'}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none">
                  <path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path>
               </svg>
            </span>
         </button>
         <div className={active ? "option-list option-open" : "option-list"}>
            {options.map((item, i) => (
               <button
                  key={i}
                  className={`option${selectOption === i ? " _active" : ""}`}
                  onClick={() => handleOptionClick(i)}
               >
                  {item}
               </button>
            ))}
         </div>
      </div>
   );
}
