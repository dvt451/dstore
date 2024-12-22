import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../../shared/data/products'; // Assuming products array is available
import NotFound from './NotFound';
import SideBarCard from '../../card/SideBarCard';
import { useFavorites } from '../../../shared/hooks/FavoritesProvider';
import { useGlobalContext } from '../../../shared/hooks/GlobalProvider';

export default function FavoritesSidebar() {
	const { favorites } = useFavorites();
	const { sidebarClose } = useGlobalContext()

	return (
		<>
			<Link to={'/wishlist'} onClick={sidebarClose} className="side-bar__top">
				<h2>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 22 20"
						fill="none"
					>
						<path
							d="M11 18.144l-1.45-1.338C4.4 12.123 1 9.162 1 5.75 1 3.383 2.909 1.5 5.237 1.5c1.676 0 3.229.867 4.263 2.33C10.795 2.367 12.348 1.5 14.024 1.5 16.352 1.5 18.26 3.383 18.26 5.75c0 3.412-3.4 6.373-8.55 11.056L11 18.144z"
							fill="black"
						></path>
					</svg>
					<span>My Favorites</span>
				</h2>
			</Link>
			{favorites.length > 0 ? (
				<>
					<div className="side-bar__block-items">
						<div className='side-bar__items'>
							{favorites.map((favoriteItem, index) => {
								const product = products.find(
									(product) => product.id === favoriteItem.id
								);
								return product ? (
									<SideBarCard product={product} key={index} />
								) : null;
							})}
						</div>
					</div>
					<div className="side-bar__bottom">
						<div className="side-bar__actions side-bar-actions">
							<Link
								to={'/wishlist'}
								style={{ backgroundColor: '#000' }}
								className="side-bar-actions__favorites-button button"
							>
								View All Favorites
							</Link>
						</div>
					</div>
				</>
			) : (
				<NotFound />
			)}
		</>
	);
}
