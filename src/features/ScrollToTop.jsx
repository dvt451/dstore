import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
	const location = useLocation();

	useEffect(() => {
		// Scroll to the top of the page whenever the route changes
		if (location.pathname !== "/shop") {
			setTimeout(() => {
				window.scrollTo(0, 0);
			}, 500);
		}

	}, [location]);

	return null;
};

export default ScrollToTop;
