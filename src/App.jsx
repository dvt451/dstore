import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './scss/style.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/parallax"

import HomePage from './components/home/HomePage';
import ShopPage from './components/shop/ShopPage';
import ProductPage from './components/pages/ProductPage';
import CartPage from './components/pages/CartPage';
import CheckoutPage from './components/pages/CheckoutPage';
import UserAccountPage from './components/pages/UserAccountPage';
import ScrollToTop from './features/ScrollToTop';
import LoginSignupPage from './components/pages/LogInSignUpPage';
import Contacts from './components/pages/Contacts';
import Wishlist from './components/pages/Wishlist';
import { AppProviders } from './components/Providers';
import { Bounce, ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import DvtBadge from './widgets/DvtBadge';


function App() {
	const location = useLocation()
	return (
		<>
			<AppProviders>
				<ScrollToTop />
				<DvtBadge />
				<AnimatePresence mode='wait'>
					<Routes location={location} key={location.pathname}>
						<Route element={<HomePage />} index />
						<Route element={<ShopPage />} path="/shop" />
						<Route element={<ProductPage />} path="/product/:id" />
						<Route element={<CartPage />} path="/cart" />
						<Route element={<CheckoutPage />} path="/checkout" />
						<Route element={<UserAccountPage />} path="/profile" />
						<Route element={<LoginSignupPage />} path="/login" />
						<Route element={<Contacts />} path="/contacts" />
						<Route element={<Wishlist />} path="/wishlist" />
						<Route element={<HomePage />} path="/*" />
					</Routes>
				</AnimatePresence>
			</AppProviders>
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