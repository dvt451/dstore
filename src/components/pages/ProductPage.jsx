import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../shared/data/products';
import ProductCard from '../../widgets/card/ProductCard';
import Header from '../../widgets/header/Header';
import AddToCart from '../../widgets/buttons/AddToCart';
import { useCart } from '../../shared/hooks/CartProvider';
import Footer from '../../widgets/footer/Footer';
import { useGlobalContext } from '../../shared/hooks/GlobalProvider';
import { FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../../shared/hooks/FavoritesProvider';
import Transition from '../../features/Transition';

const ProductPage = () => {
	const { id } = useParams();
	const product = products.find((item) => item.id === Number(id));
	const { setOrderProductFromSingle } = useCart();
	const navigate = useNavigate(); // To navigate to the checkout page
	const { StarRating } = useGlobalContext()
	const { toggleFavorite, isFavorite } = useFavorites()
	const isInFavorites = isFavorite(product.id);


	// State for quantity selection
	const [quantity, setQuantity] = useState(1);

	// Get related products from the same category
	const relatedProducts = products.filter(
		(item) => item.category === product?.category && item.id !== product?.id
	);

	// Get reviews for the product (assuming reviews data is part of the product object)
	const reviews = product.reviews || [];
	const avgRating =
		reviews.length > 0
			? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
			: 0;

	const handleBuyNow = () => {
		setOrderProductFromSingle(product, quantity); // Add only selected product to orderProduct
		navigate('/checkout'); // Navigate to checkout page
	};

	return (
		<>
			<Header />
			<main className="product-page">
				<div className="product-page__container">
					<div className="product-page__block">
						<div className="product-page__image -ibg--contain">
							<img src={product.image} alt={product.name} />
						</div>
						<div className="product-page__menu product-page-menu">
							<h1 className='product-page-menu__name'>{product.name}</h1>
							<p className="product-page-menu__category">{product.category}</p>
							<div className='product-page-menu__row'>
								<div className='product-page-menu__stars'><StarRating rating={product.rating} />|</div>
								<span className={`stock-availability ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
									{product.stock > 0 ? 'In Stock' : 'Out of Stock'}
								</span>
							</div>
							<p className="product-page-menu__price">${product.price}</p>
							<p className="product-page-menu__description">{product.description}</p>
							<div className="product-page__details product-page-details">
								{product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
								{product.product && <p><strong>Screen Size:</strong> {product.screenSize} inches</p>}
								{product.storage && <p><strong>Storage:</strong> {product.storage}</p>}
								{product.ram && <p><strong>RAM:</strong> {product.ram}</p>}
								{product.stock && <p><strong>Available: </strong> {product.stock}</p>}
								{product.processor && <p><strong>Processor:</strong> {product.processor}</p>}
								{product.rating && <p><strong>Rating:</strong> {product.rating} ★</p>}
							</div>
							{product.stock > 0 && (
								<div className="product-page-menu__actions product-page-actions">
									<div className="product-page-actions__row">
										<div className="quantity">
											<button
												onClick={() => {
													setQuantity(quantity > 1 ? quantity - 1 : 1);
												}}
											>
												<svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M17 1H1" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
												</svg>



											</button>
											<div className='quantity__value'>
												{quantity}
											</div>
											<button
												onClick={() => {
													setQuantity(product.stock > quantity ? quantity + 1 : quantity);
												}}
											>
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M9 17V9M9 9V1M9 9H17M9 9H1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
												</svg>
											</button>
										</div>
										<button className="product-page-actions__buy-now button" onClick={handleBuyNow}>Buy Now</button>
										<button onClick={() => {
											toggleFavorite(product)
										}} className={`product-page-actions__heart${isInFavorites ? ' _active' : ''}`}>
											<FaRegHeart />
										</button>
									</div>
									<div className="product-page-actions__row">
										<AddToCart product={product} quantity={quantity} />
									</div>
								</div>
							)}
							<div className="product-page-menu__policies purchase-polices">
								<div className="purchase-polices__item">
									<i className="purchase-polices__icon">
										<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_261_4843)">
												<path d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												<path d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												<path d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												<path d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												<path d="M5 11.8182H11.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												<path d="M1.81836 15.4545H8.48503" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												<path d="M5 19.0909H11.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											</g>
											<defs>
												<clipPath id="clip0_261_4843">
													<rect width="40" height="40" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</i>
									<div className='purchase-polices__column'>
										<h4 className="purchase-polices__title">Free Delivery</h4>
										<p className="purchase-polices__text">Enter your postal code for Delivery Availability</p>
									</div>
								</div>
								<div className="purchase-polices__item">
									<i className="purchase-polices__icon">
										<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_261_4865)">
												<path d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												<path d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											</g>
											<defs>
												<clipPath id="clip0_261_4865">
													<rect width="40" height="40" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</i>
									<div className='purchase-polices__column'>
										<h4 className="purchase-polices__title">Return Delivery</h4>
										<p className="purchase-polices__text">Free 30 Days Delivery Returns.</p>
									</div>
								</div>
							</div>
						</div>

					</div>
					{/* Related Products Section */}
					{relatedProducts.length > 0 ? <section className="related-products">
						<h2 className='related-products__title'>Related products</h2>
						<div className="product-list">
							{relatedProducts.slice(0, 5).map((relatedProduct) => (
								<ProductCard key={relatedProduct.id} product={relatedProduct} />
							))}
						</div>
					</section> :
						<h2 className='related-products__title'>No Related products</h2>
					}
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Transition(ProductPage);
