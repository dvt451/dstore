import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import './scss/style.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/parallax"

import ShopPage from './components/shop/ShopPage';
import ProductPage from './components/pages/ProductPage';
import CartPage from './components/Cart/CartPage';
import CheckoutPage from './components/pages/CheckoutPage';
import UserAccountPage from './components/pages/UserAccountPage';
import ScrollToTop from './features/ScrollToTop';
import LoginSignupPage from './components/pages/LogInSignUpPage';
import Contacts from './components/pages/Contacts';
import Wishlist from './components/pages/Wishlist';
import { AppProviders } from './components/Providers';
import { Bounce, ToastContainer } from 'react-toastify';


function App() {

	return (
		<>
			<BrowserRouter>
				<AppProviders>
					<ScrollToTop />
					<Routes>
						<Route element={<HomePage />} path="/" />
						<Route element={<ShopPage />} path="/shop" />
						<Route element={<ProductPage />} path="/product/:id" />
						<Route element={<CartPage />} path="/cart" />
						<Route element={<CheckoutPage />} path="/checkout" />
						<Route element={<UserAccountPage />} path="/profile" />
						<Route element={<LoginSignupPage />} path="/login" />
						<Route element={<Contacts />} path="/contacts" />
						<Route element={<Wishlist />} path="/wishlist" />
					</Routes>
				</AppProviders>
			</BrowserRouter>
			<ToastContainer
				position="top-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={true}
				pauseOnHover
				draggable
				transition={Bounce}
			/>
		</>
	);
}

export default App;