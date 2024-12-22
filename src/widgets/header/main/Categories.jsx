import React from 'react'
import { BiCategoryAlt } from "react-icons/bi";
import { categories } from '../../../shared/data/products';
import { Link } from 'react-router-dom';
import { MdComputer } from "react-icons/md";
import { PiComputerTowerLight } from "react-icons/pi";
import { GiSmartphone } from "react-icons/gi";
import { FaDisplay } from "react-icons/fa6";
import { IoVolumeHighOutline } from "react-icons/io5";
import { TbDeviceGamepad2 } from "react-icons/tb";
import { GiDeliveryDrone } from "react-icons/gi";
import { useFilter } from '../../../shared/hooks/FilterProvider';

export default function Categories() {
	const { resetAll, resetCategories } = useFilter()
	const icons = [
		<MdComputer />,
		<PiComputerTowerLight />,
		<GiSmartphone />,
		<FaDisplay />,
		<IoVolumeHighOutline />,
		<TbDeviceGamepad2 />,
		<GiDeliveryDrone />,
	]
	return (
		<div className='categories'>
			<Link to={'/shop'} onClick={resetAll} className='categories__button'>
				<i className='categories__icon'><BiCategoryAlt /></i>
				<p>All Categories</p>
				<i className='categories__arrow'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none"><path d="M7.49932 10.8155C7.22726 11.0875 6.77274 11.0875 6.49998 10.8155L0.206656 4.53826C-0.0688853 4.26272 -0.0688853 3.81587 0.206656 3.54103C0.482197 3.26549 0.929748 3.26549 1.20529 3.54103L6.99997 9.3196L12.794 3.54033C13.0702 3.26479 13.517 3.26479 13.7933 3.54033C14.0688 3.81587 14.0688 4.26272 13.7933 4.53757L7.49932 10.8155Z" fill="#060606"></path></svg>
				</i>
			</Link>
			<nav className="categories__items">
				<ul>
					{
						categories.map((item, i) => {
							return <li key={i}>
								<Link to={`/shop?category=${item}`} onClick={resetCategories}>
									{icons[i]}
									<span>{item}</span>
								</Link>
							</li>
						})
					}
				</ul>
			</nav>
		</div>
	)
}