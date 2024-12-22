import React, { createContext, useState, useContext, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();
	const [cartSidebarState, setCartSidebarState] = useState(false)
	const [comparisonSidebarState, setComparisonSidebarState] = useState(false)
	const [favoritesSidebarState, setFavoritesSidebarState] = useState(false)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
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

	// Sync sidebar state on navigation
	useEffect(() => {
		setIsSidebarOpen(false); // Close sidebar after navigating
	}, [navigate]);

	const sidebarClose = () => {
		setIsSidebarOpen(false)
		setCartSidebarState(false)
		setComparisonSidebarState(false)
		setFavoritesSidebarState(false)
	}

	return (
		<GlobalContext.Provider value={{
			StarRating,
			isSidebarOpen,
			toggleSidebar,
			cartSidebarState,
			comparisonSidebarState,
			favoritesSidebarState,
			sidebarClose,
			setIsSidebarOpen,
			setCartSidebarState,
			setComparisonSidebarState,
			setFavoritesSidebarState,
		}}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
