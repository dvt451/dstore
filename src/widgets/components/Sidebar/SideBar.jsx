import React from 'react';
import { useGlobalContext } from '../../../shared/hooks/GlobalProvider'
import CartSidebar from './CartSidebar';
import ComparisonSideBar from './ComparisonSideBar';
import FavoritesSidebar from './FavoritesSidebar';

const SideBar = () => {
	const {
		isSidebarOpen,
		cartSidebarState,
		comparisonSidebarState,
		favoritesSidebarState,
		sidebarClose

	} = useGlobalContext();



	return (
		<div className={`side-bar${isSidebarOpen ? '' : ' close'}`}>
			<div className="side-bar__layer" onClick={sidebarClose}></div>
			<div className="side-bar__block">
				<button onClick={sidebarClose} className='close-button'></button>
				{cartSidebarState && <CartSidebar />}
				{comparisonSidebarState && <ComparisonSideBar />}
				{favoritesSidebarState && <FavoritesSidebar />}
			</div>
		</div>
	);
};

export default SideBar;