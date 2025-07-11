import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useLocation } from 'react-router-dom';

const Transition = (OgComponent) => {
	return function WrappedComponent(props) {
		const location = useLocation()
		const [slideState, setSlideState] = useState(false)
		setTimeout(() => {
			setSlideState(true)
		}, 1000);
		return (
			<>
				<OgComponent {...props} />
				<motion.div
					style={{ display: location === '/' ? 'none' : 'block', zIndex: 999 }}
					className={`slide-transition${slideState ? "sld-on" : "sld-off"} slide-in`}
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 0 }}
					exit={{ scaleX: 1 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				/>
				<motion.div
					style={{ display: location === '/' ? 'none' : 'block', zIndex: 999 }}
					className={`slide-transition${slideState ? "sld-on" : "sld-off"} slide-out`}
					initial={{ scaleX: 1 }}
					animate={{ scaleX: 0 }}
					exit={{ scaleX: 0 }}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
				/>
			</>
		);
	};
};

export default Transition;
