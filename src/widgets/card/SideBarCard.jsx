import React from 'react'
import { useCart } from '../../shared/hooks/CartProvider';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../shared/hooks/GlobalProvider';
import AddToCart from '../buttons/AddToCart';
import { useFavorites } from '../../shared/hooks/FavoritesProvider';

export default function SideBarCard({ product }) {
	const { updateQuantity, addToCart,remove } = useCart();
	const {
		cartSidebarState,
		favoritesSidebarState,
	} = useGlobalContext();
	const {removeFromFavorites} = useFavorites()

	const handleRemove = () => {
		cartSidebarState ? remove(product.id)
		 : removeFromFavorites(product.id);
	 };
	return (
		<div className="side-bar-item">
			<button onClick={handleRemove} className="side-bar-item__remove">x</button>
			<Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} className="side-bar-item__image" /></Link>
			<div className="side-bar-item__details">
				<h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
				<p className="side-bar-item__price">Price: ${product.price}</p>
				{cartSidebarState &&
					<div className="side-bar-item__quantity">
						<div className="quantity-controls">
							<button onClick={() => updateQuantity(product.id, product.quantity - 1)} disabled={product.quantity <= 0}>-</button>
							<p>{product.quantity}</p>
							<button onClick={() => updateQuantity(product.id, product.quantity + 1)} disabled={product.quantity >= product.stock}>+</button>
						</div>
						<span>x ${product.price * product.quantity}</span>
					</div>
				}
				{favoritesSidebarState && <AddToCart product={product} quantity={1} />}
			</div>
		</div>
	)
}
