import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For routing between pages (if you're using React Router)
import { useCart } from '../../shared/hooks/CartProvider';
import ToFilterPage from '../buttons/ToFilterPage';
import Search from '../search/Search';
import Logo from '../logo/Logo';
import Contacts from './top/Contacts'
import Actions from './top/Actions'
import SideBarCart from '../components/Sidebar/SideBar';
import Categories from './main/Categories';
import Navigation from './main/Navigation';
import BurgerBody from './BurgerBody';

const Header = () => {
	const [burgerState, setBurgerState] = useState(false)
	const burgerActive = () => {
		setBurgerState(true)
	}
	const burgerDisActive = () => {
		setBurgerState(false)
	}

	return (
		<>
			<header className="header">
				<div className='header__top header-top'>
					<div className='header-top__container'>
						<h1><Logo nameClass={'header__logo '} /></h1>
						<Search />
						<Actions burgerActive={burgerActive} />
					</div>
				</div>
				<div className="header__main header-main">
					<div className="header-main__container">
						<Categories />
						<Navigation />
						<Contacts />
					</div>
				</div>
				<BurgerBody burgerState={burgerState} burgerActive={burgerActive} burgerDisActive={burgerDisActive} />
			</header>
			<SideBarCart />
		</>
	);
};

export default Header;