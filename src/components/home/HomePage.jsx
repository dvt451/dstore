import React from 'react';
import Header from "../../widgets/header/Header";
import Footer from '../../widgets/footer/Footer';
import Hero from './hero/Hero';
import CategoriesSlide from './categories/CategoriesSlide';
import NewArrivals from './NewArrivals';
import Banner from './Banner';
import Advantages from './advantages/Advantages';
import PopularBrands from './PopularBrands';
import HomePageBottom from './HomePageBottom';

const HomePage = () => {


	return (
		<div className="wrapper">
			<Header />
			<main className="home-page">
				<Hero />
				<CategoriesSlide />
				<NewArrivals />
				<PopularBrands />
				<Banner />
				<Advantages />
				<HomePageBottom />
			</main>
			<Footer />
		</div>
	);
};

export default HomePage;
