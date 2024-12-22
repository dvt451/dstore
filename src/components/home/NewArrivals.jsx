import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { products } from '../../shared/data/products';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import ProductActions from '../../widgets/components/ProductActions';

const customRound = (num) => {
	const integerPart = Math.floor(num); // Целая часть
	const decimalPart = num - integerPart; // Дробная часть

	if (decimalPart > 0.5) return integerPart + 1; // Если дробная часть больше 0.5, округляем вверх
	return integerPart; // Иначе вниз
};

const StarRating = ({ rating }) => {
	// Округление числа до ближайшего целого
	const roundedRating = customRound(rating);

	// Генерация звезд
	const stars = Array.from({ length: roundedRating }, (_, i) => (
		<FaStar key={i} />
	));

	return stars;
};

export default function NewArrivals() {


	return (
		<div className='slider'>
			<div className='slider__container'>
				<h2 className="home-title">New Arrival Products</h2>
				<div className="slider__slider">
					<Swiper
						modules={[Navigation]}
						spaceBetween={20}
						slidesPerView={6}
						breakpoints={{
							320: { slidesPerView: 2 }, // For screens >= 480px
							768: { slidesPerView: 3 }, // For screens >= 768px
							991: { slidesPerView: 5 }, // For screens >= 1024px
						}}
						loop
						navigation={{
							nextEl: '.arrival-next',
							prevEl: '.arrival-prev',
						}}
					>
						{
							products.slice(20, 30).map((item, i) => (
								<SwiperSlide key={i}>
									<div className="slide slide-product">
										<div className='slide__image -ibg--contain'>
											<ProductActions product={item} />
											<Link to={`/product/${item.id}`}><img src={item.image} alt="Image" /></Link>
										</div>
										<div className="slide__details">
											<Link to={`/shop?category=${item.category}`} className="slide-product__category">{item.category}</Link>
											<h4 className="slide__name"><Link to={`/product/${item.id}`}>{item.name}</Link></h4>
											<div className="slide-product__rating">
												<StarRating rating={item.rating} />
											</div>
											<div className="slide-product__price usd">{item.price}.00</div>
										</div>
									</div>
								</SwiperSlide>
							))
						}
					</Swiper>
					<div className="navigation">
						<button className="navigation-button arrival-prev navigation__prev"><svg style={{ rotate: '90deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg></button>
						<button className="navigation-button arrival-next navigation__next"><svg style={{ rotate: '-90deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg></button>
					</div>
				</div>
			</div>
		</div>
	)
}
