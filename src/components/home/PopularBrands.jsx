import React from 'react'

export default function PopularBrands() {
	const brands = [
		"/img/brands/brand01.png",
		"/img/brands/brand02.png",
		"/img/brands/brand03.png",
		"/img/brands/brand04.png",
		"/img/brands/brand05.png",
		"/img/brands/brand06.png",
		"/img/brands/brand07.png",
		"/img/brands/brand08.png",
		"/img/brands/brand09.png",
		"/img/brands/brand10.png",
	]

	return (
		<div className='brands'>
			<div className="brands__container">
				<h2 className="home-title">Popular Brands</h2>
				<ul className="brand__list">
					{
						brands.map((item, i) => {
							return <li key={i} className="brand__item">
								<img src={item} alt={"brand " + (i + 1)} />
							</li>
						})
					}

				</ul>
			</div>
		</div>
	)
}
