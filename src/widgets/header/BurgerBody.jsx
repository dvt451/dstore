import React, { useState } from 'react'
import Logo from '../logo/Logo'
import { menu } from '../../shared/data/General'
import { categories } from '../../shared/data/products'
import { Link } from 'react-router-dom'
import { useFilter } from '../../shared/hooks/FilterProvider'

export default function BurgerBody({ burgerState, burgerDisActive }) {
	const [active, setActive] = useState(true)
	const { resetAll } = useFilter()
	const menuActivation = () => {
		setActive(true)
	}
	const categoryActivation = () => {
		setActive(false)
	}
	return (
		<div className={`burger-body${burgerState ? ' _active' : ''}`}>
			<div onClick={burgerDisActive} className="burger-body__layer"></div>
			<div className="burger-body__content">
				<button onClick={burgerDisActive} className='close-button'></button>
				<Logo />
				<div className="burger-body__buttons">
					<button onClick={menuActivation} className={active ? '_active' : ''}>Menu</button>
					<button onClick={categoryActivation} className={!active ? '_active' : ''}>Categories</button>
				</div>
				<div className="burger-body__item-list">
					<nav className={`burger-body__menu-list${active ? ' _active' : ''}`}>
						<ul>
							{
								menu.map((item, i) => {
									return <li key={i} style={{ transitionDelay: `0.${i + 2}s` }}>{item.title === 'Shop' ? <Link onClick={resetAll} to={item.link} key={i}>{item.title}</Link> : <Link to={item.link} key={i}>{item.title}</Link>}</li>
								})
							}
						</ul>
					</nav>
					<nav className={`burger-body__category-list${!active ? ' _active' : ''}`}>
						<ul>
							{
								categories.map((item, i) => {
									return <li key={i} style={{ transitionDelay: `0.${i + 2}s` }}><Link to={`/shop?category=${item}`} >{item}</Link></li>
								})
							}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}