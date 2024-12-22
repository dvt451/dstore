import React, { useEffect, useRef, useState } from 'react'

export default function Select({options}) {
   const selectRef = useRef(null)
   const [active, setActive] = useState(false)
   const [optnum, setOptnum] = useState(0)
   const handleClickOutside = (event) => {
   if (selectRef.current && !selectRef.current.contains(event.target)) {
        // Закрываем select-list, если клик был вне его
        setActive(false);
      }
   };

    useEffect(() => {
      // Добавляем обработчик клика при монтировании компонента
      document.addEventListener('click', handleClickOutside);
  
      // Удаляем обработчик клика при размонтировании компонента
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

  return (
   <div ref={selectRef} className={`select${active ? " _active" : ""}`}>
         <button className="option selected" onClick={()=> setActive(!active)}>
            <div className="selected-content">
               <div className="selected-content-icon"></div>
               <span className="selected-text">{options[optnum]}</span>
            </div>
            <span className={active == false ? "selected-icon" : 'selected-icon active'}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg>
            </span>
         </button>
         <div  className={active == false ? "option-list" : 'option-list option-open'}>
         {
            options.map((item,i)=>{
               return <button key={i} className="option" onClick={()=> {
                  setOptnum(i);
                  setActive(false)
               }}>{item}</button>
            })
         }
         </div>
   </div>
  )
}
