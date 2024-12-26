import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect } from 'react'
import ShopCategories from './ShopCategories'

export default function ShopTop() {
	gsap.registerPlugin(ScrollTrigger)
	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".shop-top-block__column",
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			}
		})
		tl.from(".shop-top-block__image img", {
			scale: 1.6,
		})
	}, [])
	return (
		<section className="shop__top shop-top-block">
			<div className="shop-top-block__top">
				<div className="shop-top-block__content">
					<p className="shop-top-block__text">Find the rights keyboard for you</p>
					<h2 className="shop-top-block__title">Keyboards That Have You Covered.</h2>
					<div className="shop-top-block__row">
						<div className="shop-top-block__label">
							<span>now on sale</span>
							<p>45% Flat</p>
						</div>
						<button className="shop-top-block__button button"><span>Shop now</span></button>
					</div>
				</div>
				<div className='shop-top-block__column'>
					<div className="shop-top-block__image">
						<img src="/img/banners/Image-min.png" alt="banner" />
					</div>
				</div>

			</div>
			<div className="shop-top-block__bottom">
				<ShopCategories />
			</div>
		</section>
	)
}
