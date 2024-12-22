import React from 'react';
import { Link } from 'react-router-dom'; // For routing between pages (if you're using React Router)
import Logo from '../logo/Logo';
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
	const media = [
		<FaFacebookF />,
		<FaXTwitter />,
		<FaInstagram />,
		<FaYoutube />,
		<FaTelegramPlane />,
	]
	const footerMenu = [
		{
			title: 'Our Story',
			links: [
				"Company Profile",
				"Our Facility",
				"Commitment To Quality",
				"Contract Manufacturing",
				"Our Awards",
			]
		},
		{
			title: "Categories",
			links: [
				"Smartphone",
				"Gaming Laptop",
				"Smart Home",
				"Major Appliances",
				"Technologies",
			]
		},
		{
			title: "Quick Link",
			links: [
				"Blog",
				"Subscription",
				"Announcements",
				"FAQ’s",
			]
		},
		{
			title: "Contact Us",
			links: [
				"Become a Seller",
				"Contract Manufacturing",
				"Terms & Condition",
				"Career with us",
				"Consumer enquiry",
			]
		}
	]
	return (
		<footer className="footer">
			<div className='footer__container'>
				<div className="footer__top">
					<div className='footer__col'>
						<Logo />
						<div className="footer__address footer-address">
							<div className='footer-address__column'>
								<span>Call us 24/7</span>
								<a href='tel:+1180097976000' className="footer-address__number">+1 1800 9797 6000</a>
							</div>
							<div className='footer-address__column'>
								<p className="footer-address__text">215 Western Plaza, Melbourne, Australia</p>
								<a href='mailto:contact@dvtstore.com' className="footer-address__mail">contact@dvtstore.com</a>
							</div>
						</div>
						<div className="footer__medias">
							{
								media.map((item, i) => {
									return <Link to={'/'} className='footer__media' key={i}>{item}</Link>
								})
							}
						</div>
					</div>
					<div className='footer__links'>
						{
							footerMenu.map((item, i) => {
								return <div key={i} className="footer__column">
									<h3 className="footer__title">{item.title}</h3>
									<ul className="footer__list">
										{
											item.links.map((link, ind) => {
												return <li key={ind} className="footer__item"><Link to='/'><span>{link}</span></Link></li>
											})
										}
									</ul>
								</div>
							})
						}
					</div>

				</div>
				<div className="footer__bottom">
					<div className="footer__text">Copyright © 2024 DvtStore theme.</div>
					<div className="footer__payments">
						<div className="footer__text">We use safe payments for</div>
						<img src="/img/other/Payment.svg" alt="" />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;