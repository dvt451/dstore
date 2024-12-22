import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { products } from '../data/products';
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([products[1], products[2]]);

	const toggleFavorite = (product) => {
		const isAlreadyFavorite = favorites.some((item) => item.id === product.id);

		if (isAlreadyFavorite) {
			setFavorites(favorites.filter((item) => item.id !== product.id));
			toast.success(
				`${product.name} removed from favorites.`,
				{
					icon: <FaRegHeart style={{ color: '#fff', fontSize: '40px' }} />
				}
			);
		} else {
			setFavorites([...favorites, product]);
			toast.success(
				`${product.name} added to favorites.`,
				{
					icon: <FaHeart style={{ color: '#fff', fontSize: '40px' }} />
				}
			);
		}
	};

	// Remove product from favorites
	const removeFromFavorites = (productId) => {
		setFavorites(favorites.filter((item) => item.id !== productId));
	};

	// Check if a product is in favorites
	const isFavorite = (productId) => {
		return favorites.some((item) => item.id === productId);
	};

	// Clear all favorites
	const clearFavorites = () => {
		setFavorites([]);
	};

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				toggleFavorite,
				removeFromFavorites,
				isFavorite,
				clearFavorites,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => useContext(FavoritesContext);
