import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper/modules';
import { categories, products, productsByCategory } from '../../../shared/data/products';
import { Link } from 'react-router-dom';

export default function CategoriesSlide() {

	const categoriesImagesLink = [
		products[3].image,
		products[7].image,
		products[11].image,
		products[15].image,
		products[60].image,
		products[27].image,
		products[61].image,
	]

	return (
		<div className='slider'>
			<div className='slider__container'>
				<h2 className="home-title">Popular Categories</h2>
				<div className="slider__slider">
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={10}
						slidesPerView={6}
						breakpoints={{
							320: { slidesPerView: 2 }, // For screens >= 480px
							768: { slidesPerView: 3 }, // For screens >= 768px
							991: { slidesPerView: 6 }, // For screens >= 1024px
						}}
						loop
						navigation={{
							nextEl: '.category__next',
							prevEl: '.category__prev',
						}}
					>
						{
							[...categories, ...categories].map((item, i) => (
								<SwiperSlide key={i}>
									<Link to={`/shop?category=${item}`} className="slide">
										<div className='slide__image -ibg--contain'><img src={[...categoriesImagesLink, ...categoriesImagesLink][i]} alt="Image" /></div>
										<div className="slide__details">
											<h4 className="slide__name">{item}</h4>
											<p>{productsByCategory[i % categories.length].length} products</p>
										</div>
									</Link>
								</SwiperSlide>
							))
						}
					</Swiper>
					<div className="navigation">
						<button className="navigation-button category__prev navigation__prev"><svg style={{ rotate: '90deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg></button>
						<button className="navigation-button category__next navigation__next"><svg style={{ rotate: '-90deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg></button>
					</div>
				</div>
			</div>
		</div>
	)
}
