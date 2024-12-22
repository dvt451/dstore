import React, { useState } from 'react';
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';
import { products } from '../../shared/data/products'; // Importing the products data
import { Link } from 'react-router-dom';

const UserAccountPage = () => {
	// Sample user data (in a real app, this would come from API)
	const [userData, setUserData] = useState({
		name: 'John Doe',
		email: 'johndoe@example.com',
		address: '123 Main Street, Springfield',
		orders: [
			{ id: 1, date: '2024-10-15', status: 'Shipped', total: 320, items: [1, 2] },  // Using product IDs
			{ id: 2, date: '2024-09-12', status: 'Delivered', total: 499, items: [3, 4] },
		],
		wishlist: [
			{ id: 3 }, // Product ID
			{ id: 4 },
		]
	});

	const [profileEditMode, setProfileEditMode] = useState(false);
	const [editedProfile, setEditedProfile] = useState({ ...userData });

	const handleProfileEditChange = (e) => {
		const { name, value } = e.target;
		setEditedProfile({ ...editedProfile, [name]: value });
	};

	const saveProfileChanges = () => {
		setUserData({ ...editedProfile });
		setProfileEditMode(false);
	};

	const toggleProfileEdit = () => {
		setProfileEditMode(!profileEditMode);
	};

	// Function to get product details by ID
	const getProductById = (productId) => {
		return products.find(product => product.id === productId);
	};

	return (
		<div className="user-account-page">
			<Header />
			<main className="user-account-main">
				<div className="user-account__container">
					<h1>User Account</h1>

					{/* Profile Section */}
					<section className="profile-section">
						<h2>Profile</h2>
						{profileEditMode ? (
							<div className="profile-edit-form">
								<input
									type="text"
									name="name"
									placeholder="Full Name"
									value={editedProfile.name}
									onChange={handleProfileEditChange}
								/>
								<input
									type="email"
									name="email"
									placeholder="Email"
									value={editedProfile.email}
									onChange={handleProfileEditChange}
								/>
								<input
									type="text"
									name="address"
									placeholder="Address"
									value={editedProfile.address}
									onChange={handleProfileEditChange}
								/>
								<button onClick={saveProfileChanges}>Save Changes</button>
							</div>
						) : (
							<div className="profile-info">
								<p>Name: {userData.name}</p>
								<p>Email: {userData.email}</p>
								<p>Address: {userData.address}</p>
								<button onClick={toggleProfileEdit}>Edit Profile</button>
							</div>
						)}
					</section>
					{/* Order History Section */}
					<section className="order-history-section">
						<h2>Order History</h2>
						<div className="order-list">
							{userData.orders.length > 0 ? (
								userData.orders.map((order, index) => (
									<div key={index} className="order-item">
										<p>Order ID: {order.id}</p>
										<p>Date: {order.date}</p>
										<p>Status: {order.status}</p>
										<p>Total: ${order.total}</p>
										<div className="order-items">
											{order.items.map((itemId) => {
												const product = getProductById(itemId);
												return product ? (
													<div key={itemId} className="order-product">
														<img src={product.image} alt={product.name} className="order-product-image" />
														<div className="order-product-info">
															<p>{product.name}</p>
															<p>Price: ${product.price}</p>
														</div>
													</div>
												) : null;
											})}
										</div>
									</div>
								))
							) : (
								<p>No past orders found.</p>
							)}
						</div>
					</section>

					{/* Wishlist Section */}
					<section className="wishlist-section">
						<h2>Wishlist</h2>
						<div className="wishlist-items">
							{userData.wishlist.length > 0 ? (
								userData.wishlist.map((item, index) => {
									const product = getProductById(item.id);
									return product ? (
										<div key={index} className="wishlist-item">
											<Link to={`/product/${item.id}`}><img src={product.image} alt={product.name} className="wishlist-item-image" /></Link>
											<Link to={`/product/${item.id}`} className="wishlist-item-info">
												<p>{product.name}</p>
												<p>{product.brand}</p>
												<p>{product.category}</p>
												<p>${product.price}</p>
											</Link>
											<button>Remove</button>
										</div>
									) : null;
								})
							) : (
								<p>Your wishlist is empty.</p>
							)}
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default UserAccountPage;
