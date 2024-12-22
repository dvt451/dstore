import React from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { useFavorites } from '../../shared/hooks/FavoritesProvider';
import AddToCart from '../buttons/AddToCart';
import { useCart } from '../../shared/hooks/CartProvider';
import { FaShoppingCart } from 'react-icons/fa';

export default function WhishlistCard({ product, quantity }) {
	const { removeFromFavorites } = useFavorites()
	const { cart, addToCart } = useCart();

	// Find the quantity of this product in the cart
	const cartItem = cart.find(item => item.id === product.id);
	const isLimitReached = cartItem && cartItem.quantity >= product.stock;

	const handleAddToCart = () => {
		addToCart(product, quantity);
	};

	return (
		<div className='wishlist-product'>
			<div className='wishlist-product__column'>
				<div className='wishlist-product__main'>
					<img src={product.image} alt={product.name} />
					<div className="wishlist-product__name">{product.name}</div>
				</div>
			</div>
			<div className="wishlist-product__column">
				<div className='wishlist-product__price usd'>{product.price}</div>
			</div>
			<div className="wishlist-product__column">
				<div className='wishlist-product__stock'>{product.stock} in stock</div>
			</div>
			<div className="wishlist-product__column wishlist-product__column_actions">
				{product.stock > 0 && <>
					{product.stock > 0 &&
						<button
							onClick={handleAddToCart}
							className={`add-to-cart${isLimitReached ? ' out' : ''}`}
						>
							<span>{isLimitReached ? 'Limit Reached' : 'Add to Cart'}</span>
							<FaShoppingCart />
						</button>
					}
					<button onClick={() => {
						removeFromFavorites(product.id)
					}} className='wishlist-product__remove'><IoTrashOutline /></button>
				</>}
			</div>
		</div>
	)
}