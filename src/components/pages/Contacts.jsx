import React from 'react'
import Header from '../../widgets/header/Header'
import { Link } from 'react-router-dom'
import { GiFamilyHouse } from "react-icons/gi";
import { PiPhoneCall } from "react-icons/pi";
import Select from '../../widgets/components/Select';
import Footer from '../../widgets/footer/Footer';
import Transition from '../../features/Transition';

const Contacts = () => {
	const options = [
		"Technical help",
		"Pre-Sale Questions",
		"Partnership"
	]
	return (
		<>
			<Header />
			<main className='contacts'>
				<div className="contacts__container">
					<div className="contacts__column">
						<img src="/img/other/map.jpeg" alt="map" />
					</div>
					<div className="contacts__column">
						<div className="contacts__row">
							<div className="contacts__column-inner">
								<h2 className="contacts__title"><GiFamilyHouse /><span>Our Showroom</span></h2>
								<p className="contacts__text">551 Water Color Green Ball St, New York, NY 2041, USA</p>
								<Link to={'tel:+44180055553535'} className="contacts__link">(+44) 1800 5555 3535</Link>
								<Link to={'tel:+44180099996969'} className="contacts__link">(+44) 1800 9999 6969</Link>
							</div>
							<div className="contacts__column-inner">
								<h2 className="contacts__title"><PiPhoneCall /><span>Quick Help</span></h2>
								<p className="contacts__text">You can ask anything you want to know about our products</p>
								<Link to={'mailto:support24@techstore.coml'} className="contacts__link">support24@techstore.coml</Link>
								<Link to={'mailto:information@techstore.com'} className="contacts__link">information@techstore.com</Link>
							</div>
						</div>
						<div className="contacts__row">
							<form onSubmit={(e) => [
								e.preventDefault()
							]} className="contacts__form">
								<h2 className="contacts__title">Send a Message</h2>
								<div className='contacts__inputs'>
									<input className='text-inputs' placeholder='Your name' type="text" name="name" id="name" />
									<input className='text-inputs' placeholder='Your E-mail' type="email" name="email" id="email" />
									<Select options={options} />
									<textarea className='text-inputs' placeholder='Message' name="message" id="message"></textarea>
								</div>
								<button className='button'>Submit</button>
							</form>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}
export default Transition(Contacts);