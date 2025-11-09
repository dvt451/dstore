import React, { useState, useEffect } from 'react';
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';
import { useCart } from '../../shared/hooks/CartProvider';
import { BiError } from "react-icons/bi";
import { MdError } from "react-icons/md";
import Transition from '../../features/Transition';

const CheckoutPage = () => {
	const { cart, orderProduct } = useCart(); // Get cart from context
	const [shippingInfo, setShippingInfo] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		state: '',
		postalCode: '',
		country: '',
		shippingMethod: 'Standard',
	});

	const [paymentInfo, setPaymentInfo] = useState({
		cardNumber: '',
		expiryDate: '',
		cvv: '',
	});

	const [orderSummary, setOrderSummary] = useState({
		shippingCost: 20,
		tax: 0,
	});

	const [checkoutResult, setCheckoutResult] = useState(false)
	const [checkoutResultPopup, setCheckoutResultPopup] = useState(false)

	useEffect(() => {
		const calculateCartSummary = () => {
			let subtotal = 0;
			cart.forEach(item => {
				const product = item; // assuming item contains all the necessary product data
				subtotal += product.price * item.quantity;
			});

			const tax = subtotal * 0.1; // Assuming 10% tax
			const total = subtotal + tax + orderSummary.shippingCost;
			setOrderSummary(prevSummary => ({
				...prevSummary,
				subtotal,
				tax,
				total
			}));
		};

		calculateCartSummary(); // Recalculate summary whenever cart changes
	}, [cart, orderSummary.shippingCost]); // Recalculate when cart or shipping cost changes

	const handleCheckout = () => {
		if (
			!shippingInfo.name ||
			!shippingInfo.email ||
			!shippingInfo.phone ||
			!shippingInfo.address ||
			!shippingInfo.city ||
			!shippingInfo.state ||
			!shippingInfo.postalCode ||
			!shippingInfo.country ||
			!paymentInfo.cardNumber ||
			!paymentInfo.expiryDate ||
			!paymentInfo.cvv
		) {
			// alert("Please fill in all required fields.");
			setCheckoutResult(false)
			setCheckoutResultPopup(true)
			return;
		}
		// Proceed with order placement
		// alert('Order placed successfully!');
		setCheckoutResult(true)
		setCheckoutResultPopup(true)
		// Show Popup of result
	};

	return (
		<>
			<Header />
			<main className="checkout-main">
				<div className="checkout__container">
					<h1>Checkout</h1>

					<section className="checkout-section">
						<h2>Shipping Information</h2>
						<form>
							<input
								type="text"
								name="name"
								placeholder="Full Name"
								value={shippingInfo.name}
								onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
							/>
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={shippingInfo.email}
								onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
							/>
							<input
								type="text"
								name="phone"
								placeholder="Phone Number"
								value={shippingInfo.phone}
								onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
							/>
							<input
								type="text"
								name="address"
								placeholder="Shipping Address"
								value={shippingInfo.address}
								onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
							/>
							<input
								type="text"
								name="city"
								placeholder="City"
								value={shippingInfo.city}
								onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
							/>
							<input
								type="text"
								name="state"
								placeholder="State"
								value={shippingInfo.state}
								onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
							/>
							<input
								type="text"
								name="postalCode"
								placeholder="Postal Code"
								value={shippingInfo.postalCode}
								onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
							/>
							<input
								type="text"
								name="country"
								placeholder="Country"
								value={shippingInfo.country}
								onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
							/>
						</form>
					</section>

					<section className="checkout-section">
						<h2>Payment Information</h2>
						<form>
							<input
								type="text"
								name="cardNumber"
								placeholder="Card Number"
								value={paymentInfo.cardNumber}
								onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
							/>
							<input
								type="text"
								name="expiryDate"
								placeholder="Expiry Date (MM/YY)"
								value={paymentInfo.expiryDate}
								onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
							/>
							<input
								type="text"
								name="cvv"
								placeholder="CVV"
								value={paymentInfo.cvv}
								onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
							/>
						</form>
					</section>

					{/* Order Summary */}
					<section className="checkout-section order-summary">
						<h2>Order Summary</h2>
						<ul>
							{orderProduct.map((product, index) => {
								return (
									<li key={index} className="order-item">
										<div className="order-item-details">
											<img src={product.image} alt={product.name} className="order-item-image" />
											<div className="order-item-info">
												<h3>{product.name}</h3>
												<p>{product.category} | {product.brand}</p>
												<p><strong>Screen Size:</strong> {product.screenSize} inches</p>
												<p><strong>Storage:</strong> {product.storage}</p>
												<p><strong>RAM:</strong> {product.ram}</p>
												<p><strong>Processor:</strong> {product.processor}</p>
												<p><strong>Rating:</strong> {product.rating} ★</p>
											</div>
										</div>
										<div className="order-item-quantity">
											<p>Quantity: {product.quantity}</p>
											<p>Subtotal: <strong>${product.price * product.quantity}</strong></p>
										</div>
									</li>
								);
							})}
						</ul>
						<div className="summary-item">
							<span>Shipping:</span>
							<span> ${orderSummary.shippingCost}</span>
						</div>
						<div className="summary-item">
							<span>Tax:</span>
							<span> ${orderSummary.tax.toFixed(2)}</span>
						</div>
						<div className="summary-item total">
							<span>Total:</span>
							<span> <strong>${orderSummary.total?.toFixed(2)}</strong></span>
						</div>
					</section>

					<button className="checkout-btn" onClick={handleCheckout}>Confirm Order</button>
				</div>
				<div className={`checkout-result${checkoutResultPopup ? "" : " hidden"}`}>
					<div className={`checkout-result__block${checkoutResult ? ' procced' : ''}`}>
						{
							checkoutResult ?
								<MdError /> :
								<BiError />
						}

						<p className="checkout-result__text">{checkoutResult ? "Order placed successfully!" : "Please fill in all required fields."}</p>
						<button onClick={() => {
							setCheckoutResultPopup(false)
						}} className="checkout-result__button button">Close</button>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Transition(CheckoutPage);