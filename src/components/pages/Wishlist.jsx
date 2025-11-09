import React from 'react';
import { toast } from 'react-toastify';
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';
import { CiHeart } from "react-icons/ci";
import WhishlistCard from '../../widgets/card/WhishlistCard';
import { useFavorites } from '../../shared/hooks/FavoritesProvider';
import { useCart } from '../../shared/hooks/CartProvider';
import { FaShoppingCart } from 'react-icons/fa';
import { BiSolidError } from "react-icons/bi";
import Transition from '../../features/Transition';


const Wishlist = () => {
	const { favorites } = useFavorites();
	const { cart, setCart } = useCart();

	const handleAddAllToCart = () => {
		if (favorites.length === 0) {
			toast.info('Your wishlist is empty!');
			return;
		}

		const updatedCart = [...cart]; // Create a copy of the existing cart
		let addedCount = 0; // Counter for successfully added products

		favorites.forEach((product) => {
			const productIndex = updatedCart.findIndex((item) => item.id === product.id);

			if (productIndex >= 0) {
				const existingProduct = updatedCart[productIndex];
				const totalQuantity = existingProduct.quantity + 1;

				// Ensure the quantity doesn't exceed stock
				if (totalQuantity <= product.stock) {
					updatedCart[productIndex].quantity = totalQuantity;
					addedCount++;
				} else {
					updatedCart[productIndex].quantity = product.stock; // Max out at stock limit
				}
			} else {
				// Add new product if it's not in the cart
				if (product.stock > 0) {
					updatedCart.push({ ...product, quantity: 1 });
					addedCount++;
				}
			}
		});

		setCart(updatedCart); // Batch update the cart once

		if (addedCount > 0) {
			toast.success(
				`${addedCount} product(s) added to the cart!`,
				{
					icon: <FaShoppingCart />, // Green filled cart icon
				}
			);
		} else {
			toast.warning('No products were added to the cart. Check stock availability.',
				{
					icon: <BiSolidError />, // Orange outline cart icon
				}
			);
		}
	};

	return (
		<div className='wrapper'>
			<Header />
			<main className='wishlist'>
				<h1 className="wishlist__title"><CiHeart /> WHISHLIST</h1>
				<div className="wishlist__container">
					<div className="wishlist__content wishlist-content">
						<div className='wishlist-content__top'>
							<div className="wishlist-content__column">Products</div>
							<div className="wishlist-content__column">Price</div>
							<div className="wishlist-content__column">Stock status</div>
							<div className="wishlist-content__column">Action</div>
						</div>
						{favorites.length > 0 ?
							<>
								<div className="wishlist-content__products">
									{favorites.map((product, i) => (
										<WhishlistCard key={i} product={product} />
									))}
								</div>
								<div className="wishlist-content__bottom">
									<button
										className='wishlist-content__button'
										onClick={handleAddAllToCart}
									>
										Add all to cart
									</button>
								</div>
							</>
							: <p class="empty-products-list-message">Your whishlist is empty!</p>
						}

					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
export default Transition(Wishlist);
