import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { products } from '../../../shared/data/products';
import DealsCard from '../../../widgets/card/DealsCard';

export default function Deals() {
	const dealsQuanity = Math.round(Math.random() * 62)
	return (
		<div className='deals'>
			<h3 className='deals__title'>Deals Of The Day</h3>
			<Swiper
				modules={[Navigation]}
				spaceBetween={20}
				slidesPerView={1}
				breakpoints={{
					479: { slidesPerView: 2 }, // For screens >= 480px
				}}
				loop
				navigation={{
					nextEl: '.deals__next',
					prevEl: '.deals__prev',
				}}
			>
				{
					products.slice(dealsQuanity < 9 ? 0 : dealsQuanity - 8, dealsQuanity < 9 ? 9 : dealsQuanity).map((item, i) => (
						item.stock > 0 && <SwiperSlide key={i}>
							<DealsCard product={item} />
						</SwiperSlide>
					))
				}
			</Swiper>
			<div className="navigation">
				<button className="navigation-button deals__prev navigation__prev"><svg style={{ rotate: '90deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg></button>
				<button className="navigation-button deals__next navigation__next"><svg style={{ rotate: '-90deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg></button>
			</div>
		</div>
	)
}
