import React from 'react'

export default function CheckboxFilter({ label, items, name, selectedFilters, onChange }) {
  return (
    <div>
      <h3>{label}</h3>
      {items.map((item, index) => (
        <div className="checkbox" key={index}>
          <input
            id={`${name}_${item}_${index}`}
            className="checkbox__input"
            type="checkbox"
            name={name}
            value={item}
            onChange={onChange}
            checked={selectedFilters.includes(item)}
          />
          <label htmlFor={`${name}_${item}_${index}`} className="checkbox__label">
            <span className="checkbox__text">{item}</span>
          </label>
        </div>
      ))}
    </div>
  )
}
