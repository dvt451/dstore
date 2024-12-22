import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../shared/hooks/CartProvider';
import { products } from '../../shared/data/products'; // Assuming products array is available
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';
import { IoTrashOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

const CartPage = () => {
	const { cart, setOrderProductFromCart, remove, updateQuantity } = useCart();
	const navigate = useNavigate();

	const calculateCartSummary = () => {
		let subtotal = 0;
		cart.forEach(item => {
			const product = products.find(product => product.id === item.id);
			if (product) {
				subtotal += product.price * item.quantity;
			}
		});

		const tax = subtotal * 0.1; // Assuming 10% tax
		const total = subtotal + tax;
		return { subtotal, tax, total };
	};

	const { subtotal, tax, total } = calculateCartSummary();

	const handleProceedToCheckout = () => {
		if (cart.length === 0) {
			toast.info('Your cart is empty. Please add items to the cart before proceeding.');
			return;
		}
		setOrderProductFromCart(); // Add all products from cart to orderProduct
		navigate('/checkout'); // Navigate to checkout page
	};

	return (
		<div className="cart-page-wrapper">
			<Header />
			<main className="cart-page">
				<div className="cart__container">
					<h1>Products</h1>

					<div className="cart-items">
						{cart.length > 0 ? (
							cart.map((cartItem, index) => {
								const product = products.find(item => item.id === cartItem.id);
								return product ? (
									<div className="cart-item" key={index}>
										<div className="cart-item-info">
											<img src={product.image} alt={product.name} className="cart-item-image" />
											<div className="cart-item-details">
												<h3>{product.name}</h3>
												<p>{product.category}</p>
												<p className="cart-item-price">Price: ${product.price}</p>
											</div>
										</div>
										<div className="cart-item-quantity">
											<div className="quantity-controls">
												<button onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)} disabled={cartItem.quantity <= 1}>-</button>
												<p>Quantity: {cartItem.quantity}</p>
												<button onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} disabled={cartItem.quantity >= cartItem.stock}>+</button>
											</div>
											<p>Subtotal: <strong>${product.price * cartItem.quantity}</strong></p>
										</div>
										<button className="remove-item" onClick={() => remove(cartItem.id)}><IoTrashOutline /></button>
									</div>
								) : null;
							})
						) : (
							<p className="empty-cart-message">Your cart is empty!</p>
						)}
					</div>

					<div className="cart-summary">
						<h3>Summary</h3>
						<div className="summary-item">
							<span>Subtotal:</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						<div className="summary-item">
							<span>Taxes (10%):</span>
							<span>${tax.toFixed(2)}</span>
						</div>
						<div className="summary-item total">
							<span>Total:</span>
							<span>${total.toFixed(2)}</span>
						</div>
					</div>

					<div className="checkout-actions">
						<button onClick={handleProceedToCheckout} className="proceed-to-checkout">
							Proceed to Checkout
						</button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default CartPage;
