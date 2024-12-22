import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../../../shared/data/products'; // Assuming products array is available
import NotFound from './NotFound';
import SideBarCard from '../../card/SideBarCard';
import { useCart } from '../../../shared/hooks/CartProvider';
import { useGlobalContext } from '../../../shared/hooks/GlobalProvider';

export default function CartSidebar() {
	const { cart, setOrderProductFromCart } = useCart();
	const navigate = useNavigate();
	const { sidebarClose } = useGlobalContext()

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
			alert('Your cart is empty. Please add items to the cart before proceeding.');
			return;
		}
		setOrderProductFromCart(); // Add all products from cart to orderProduct
		sidebarClose()
		navigate('/checkout'); // Navigate to checkout page
	};
	return (
		<>
			<Link to={'/cart'} onClick={sidebarClose} className='side-bar__top'>
				<h2>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20" fill="none"><path d="M20.3614 2.61075C20.6319 2.61075 20.8532 2.72141 21.0254 2.94272C21.2221 3.16404 21.2836 3.40996 21.2098 3.68046L19.5499 11.3529C19.5007 11.5496 19.3901 11.7217 19.2179 11.8693C19.0704 11.9922 18.8983 12.0537 18.7015 12.0537H7.15601L7.52488 13.8243H17.9269C18.1974 13.8243 18.4187 13.9349 18.5909 14.1563C18.7876 14.3776 18.8491 14.6235 18.7753 14.894L18.7384 15.0784C19.2302 15.5457 19.4761 16.1113 19.4761 16.7752C19.4761 17.4392 19.2425 17.9925 18.7753 18.4351C18.3327 18.9023 17.7794 19.136 17.1154 19.136C16.4514 19.136 15.8858 18.9023 15.4186 18.4351C14.976 17.9925 14.7547 17.4392 14.7547 16.7752C14.7547 16.3572 14.8653 15.9637 15.0866 15.5948H9.70119C9.92251 15.9637 10.0332 16.3572 10.0332 16.7752C10.0332 17.4392 9.79955 17.9925 9.33232 18.4351C8.88968 18.9023 8.33638 19.136 7.67242 19.136C7.00846 19.136 6.44287 18.9023 5.97564 18.4351C5.533 17.9925 5.31168 17.4392 5.31168 16.7752C5.31168 16.1358 5.533 15.5948 5.97564 15.1522L3.39357 2.02056H0.44264C0.147547 2.02056 0 1.87301 0 1.57792V0.69264C0 0.397547 0.147547 0.25 0.44264 0.25H4.1313C4.27885 0.25 4.4141 0.286887 4.53706 0.36066C4.66001 0.409842 4.75838 0.495911 4.83215 0.618866C4.90592 0.717231 4.9674 0.827891 5.01658 0.950846L5.31168 2.61075H20.3614ZM7.04535 17.4023C7.21749 17.5744 7.42651 17.6605 7.67242 17.6605C7.91833 17.6605 8.12736 17.5744 8.29949 17.4023C8.47163 17.2302 8.5577 17.0211 8.5577 16.7752C8.5577 16.5293 8.47163 16.3203 8.29949 16.1481C8.12736 15.976 7.91833 15.8899 7.67242 15.8899C7.42651 15.8899 7.21749 15.976 7.04535 16.1481C6.87321 16.3203 6.78714 16.5293 6.78714 16.7752C6.78714 17.0211 6.87321 17.2302 7.04535 17.4023ZM16.4883 17.4023C16.6605 17.5744 16.8695 17.6605 17.1154 17.6605C17.3613 17.6605 17.5703 17.5744 17.7425 17.4023C17.9146 17.2302 18.0007 17.0211 18.0007 16.7752C18.0007 16.5293 17.9146 16.3203 17.7425 16.1481C17.5703 15.976 17.3613 15.8899 17.1154 15.8899C16.8695 15.8899 16.6605 15.976 16.4883 16.1481C16.3162 16.3203 16.2301 16.5293 16.2301 16.7752C16.2301 17.0211 16.3162 17.2302 16.4883 17.4023ZM17.9638 10.2832L19.2548 4.3813H5.68054L6.82403 10.2832H17.9638Z" fill="black"></path></svg>
					<span>My Cart</span>
				</h2>
			</Link>
			{cart.length > 0 ? <>
				<div className='side-bar__block-items'>
					<div className="side-bar__items">
						{cart.map((cartItem, index) => {
							return (
								<SideBarCard key={index} product={cartItem} />
							);
						})}
					</div>
				</div>
				<div className='side-bar__bottom '>
					<div className="side-bar__summary side-bar-summary">
						<div className="side-bar-summary__item">
							<span>Subtotal:</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						<div className="side-bar-summary__item">
							<span>Taxes (10%):</span>
							<span>${tax.toFixed(2)}</span>
						</div>
						<div className="side-bar-summary__item">
							<span>Total:</span>
							<span>${total.toFixed(2)}</span>
						</div>
					</div>
					<div className="side-bar__actions side-bar-actions">
						<Link to={'/cart'} onClick={sidebarClose} style={{ backgroundColor: '#000' }} className={`side-bar-actions__cart-button button`} >
							View Cart
						</Link>
						<button onClick={handleProceedToCheckout} className={`side-bar-actions__checkout-button button${cart.length === 0 ? ' disabled' : ''}`} >
							Checkout
						</button>
					</div>
				</div>
			</>
				:
				<NotFound sidebarClose={sidebarClose} />
			}
		</>
	)
}
