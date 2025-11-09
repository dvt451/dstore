import React from 'react'
import { NavLink } from 'react-router-dom'
import { menu } from '../../../shared/data/General'
import { useFilter } from '../../../shared/hooks/FilterProvider'

export default function Navigation() {
	const { resetAll } = useFilter()
	return (
		<nav className='menu'>
			<ul>
				{
					menu.map((item, i) => {
						return <li key={i}>
							{item.title === 'Shop' ? <NavLink onClick={resetAll} to={item.link}>{item.title}</NavLink> : <NavLink to={item.link}>{item.title}</NavLink>}
						</li>
					})
				}
			</ul>
		</nav>
	)
}
