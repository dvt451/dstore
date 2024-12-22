import React from 'react'
import { FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useFavorites } from '../../shared/hooks/FavoritesProvider';

export default function ProductActions({ product }) {
	const { toggleFavorite, isFavorite } = useFavorites()
	const isInFavorites = isFavorite(product.id);
	return (
		<div className='product-actions'>
			<button onClick={() => {
				toggleFavorite(product)
			}} className={`product-actions__button${isInFavorites ? ' _active' : ''}`}>
				<CiHeart />
			</button>
			{/* <button className="product-actions__button">
				<FaEye />
			</button> */}
		</div>
	)
}
