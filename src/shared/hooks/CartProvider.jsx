import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';
import { BiSolidError } from "react-icons/bi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [orderProduct, setOrderProduct] = useState([]); // Added orderProduct state


	// Add product to the cart
	const addToCart = (product, quantity = 1) => {
		const productIndex = cart.findIndex((item) => item.id === product.id);

		// If the product is already in the cart, update the quantity
		if (productIndex >= 0) {
			const updatedCart = [...cart];
			const existingProduct = updatedCart[productIndex];

			// Calculate the total quantity by adding the new quantity to the existing quantity
			const totalQuantity = existingProduct.quantity + quantity;

			// Ensure the total quantity doesn't exceed stock
			if (totalQuantity <= product.stock) {
				updatedCart[productIndex].quantity = totalQuantity;
				setCart(updatedCart);
				toast.success(`${product.name} added to cart!`, {
					icon: <FaShoppingCart />, // Green filled cart icon
				});
			} else {
				const availableQuantity = product.stock - existingProduct.quantity;
				toast.warning(
					`Sorry, you can not add more than ${product.stock} items as stock is limited.`,
					{
						icon: <BiSolidError />, // Orange outline cart icon
					}
				);
				updatedCart[productIndex].quantity = product.stock; // Add the maximum possible quantity
				setCart(updatedCart);
			}
		} else {
			// If the product is not in the cart, add it with the desired quantity (default to 1 if no quantity provided)
			if (product.stock >= quantity) {
				setCart([...cart, { ...product, quantity }]);
				toast.success(`${product.name} added to cart!`, {
					icon: <FaShoppingCart />, // Green filled cart icon
				});
			} else {
				toast.warning(
					`Sorry, you can not add more than ${product.stock} items as stock is limited.`,
					{
						icon: <BiSolidError />, // Orange outline cart icon
					}
				);
				setCart([...cart, { ...product, quantity: product.stock }]); // Add the maximum possible quantity
			}
		}
	};


	// Set product in orderProduct array (for Buy Now)
	const setOrderProductFromSingle = (product, quantity) => {
		setOrderProduct([{ ...product, quantity }]); // Clear and add the selected product
	};

	// Set all cart products in orderProduct array (for Proceed to Checkout)
	const setOrderProductFromCart = () => {
		const productsToOrder = cart.map(item => ({
			...item
		}));
		setOrderProduct(productsToOrder); // Add all products in the cart to orderProduct
	};

	// Remove product from the cart
	const remove = (productId) => {
		setCart(cart.filter((item) => item.id !== productId));
	};

	// Update product quantity in the cart
	const updateQuantity = (productId, quantity) => {
		if (quantity === 0) {
			remove(productId);
		} else {
			setCart(
				cart.map((item) =>
					item.id === productId ? { ...item, quantity: quantity } : item
				)
			);
		}
	};

	// Clear the entire cart
	const clearCart = () => setCart([]);

	return (
		<CartContext.Provider
			value={{
				cart,
				orderProduct, // Provide orderProduct state
				addToCart,
				remove,
				updateQuantity,
				clearCart,
				setCart,
				setOrderProductFromSingle, // Provide method for setting orderProduct from single product
				setOrderProductFromCart, // Provide method for setting orderProduct from the cart
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);