import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Parallax } from 'swiper/modules';
import { IoIosArrowForward } from 'react-icons/io';
export default function Banner() {
	const banner = [
		{
			backgroundImage: "/img/banners/banner1.jpeg",
			text1: "New Camera. New Design.",
			title: "iPhone 15 Pro Max",
			text2: "Titanium. So Strong. So Light. So Pro.",
			buttonText: "Buy now",
		},
		{
			backgroundImage: "/img/banners/banner2.jpeg",
			text1: "Experience Sound",
			title: "Freedom with AirPods",
			text2: "Unleash Wireless Sound Freedom.",
			buttonText: "Buy now",
		},
	]
	return (
		<div className='banner'>
			<div className='banner__container'>
				<Swiper
					modules={[Navigation, Parallax]}
					parallax={true}
					spaceBetween={20}
					slidesPerView={1}
					loop
					speed={700}
					navigation={{
						nextEl: '.banner-next',
						prevEl: '.banner-prev',
					}}
				>
					{
						banner.map((item, i) => {
							return <SwiperSlide key={i}>
								<div className={`banner__item banner__item-${i + 1} banner-item`}>
									<Link style={{ backgroundImage: `url(${item.backgroundImage})` }} className="banner-item__link-layer"></Link>
									<div className="banner-item__content">
										<p data-swiper-parallax="-200" className="banner-item__text-1">{item.text1}</p>
										<h3 data-swiper-parallax="-300" className="banner-item__title">{item.title}</h3>
										<div data-swiper-parallax="-200" className="banner-item__text-2">{item.text2}</div>
										<button data-swiper-parallax="-100" className='button'>
											<span>Shop now <IoIosArrowForward /></span>
										</button>
									</div>
								</div>
							</SwiperSlide>
						})
					}

				</Swiper>
				<div className="navigation">
					<button className="navigation-button banner-prev navigation__prev"><svg style={{ rotate: '90deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg></button>
					<button className="navigation-button banner-next navigation__next"><svg style={{ rotate: '-90deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg></button>
				</div>
			</div>
		</div>
	)
}
