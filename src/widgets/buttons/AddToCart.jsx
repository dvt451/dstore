import React from 'react';
import { useCart } from '../../shared/hooks/CartProvider';

const AddToCart = ({ product, quantity }) => {
	const { cart, addToCart } = useCart();

	// Find the quantity of this product in the cart
	const cartItem = cart.find(item => item.id === product.id);
	const isLimitReached = cartItem && cartItem.quantity >= product.stock;

	const handleAddToCart = () => {
		addToCart(product, quantity);
	};

	return (
		product.stock > 0 &&
		<button
			onClick={handleAddToCart}
			className={`add-to-cart${isLimitReached ? ' out' : ''}`}
		>
			{isLimitReached ? 'Limit Reached' : 'Add to Cart'}
		</button>
	);
};

export default AddToCart;
