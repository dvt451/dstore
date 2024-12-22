import React from 'react';
import { Link } from 'react-router-dom';
import AddToCart from '../buttons/AddToCart'
import { useGlobalContext } from '../../shared/hooks/GlobalProvider';
import ProductActions from '../components/ProductActions';

const ProductCard = ({ product, searchTerm }) => {
	const { StarRating } = useGlobalContext()
	const highlightText = (text, searchTerm) => {
		if (!searchTerm) return text; // If no search term, return the text as is

		const regex = new RegExp(`(${searchTerm})`, 'gi');
		const parts = text.split(regex);

		return parts.map((part, index) =>
			part.toLowerCase() === searchTerm.toLowerCase() ? (
				<span key={index} className="highlight">{part}</span>
			) : (
				part
			)
		);
	};
	return (
		<div className={`product-card${product.stock < 1 ? ' out' : ''}`}>
			<div className="product-card__image -ibg--contain">
				<Link to={`/product/${product.id}`} className="product-card__link-layer"></Link>
				<img src={product.image} alt={product.name} />
				<ProductActions product={product} />
			</div>
			<div className="product-card__info">
				{/* <p className="product-card__brand">{highlightText(product.brand,searchTerm)}</p> */}
				<p className="product-card__category">{highlightText(product.category, searchTerm)}</p>
				<h2 className="product-card__name"><Link to={`/product/${product.id}`}>{highlightText(product.name, searchTerm)}</Link></h2>
				{/* <p className="product-card__available">Available: {product.stock}</p> */}
				<p className="product-card__specs">
					{product.screenSize && <span>Screen: {product.screenSize}</span>}
					{product.storage && <span>Storage: {product.storage}</span>}
					{product.ram && <span>RAM: {product.ram}</span>}
					{product.processor && <span>Processor: {product.processor}</span>}
				</p>
				<div className='product-card__row'>
					<div className="product-card__rating">
						<StarRating rating={product.rating} />
					</div>
					<p className="product-card__price">${product.price}</p>
				</div>
				{/* <p className="product-card__description">{product.description}</p> */}
			</div>
			{product.stock > 0 && <AddToCart product={product} />}
		</div>
	);
};

export default ProductCard;
