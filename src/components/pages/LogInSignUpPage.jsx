import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // To navigate to other pages (like Home, Forgot Password, etc.)
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';

const LoginSignupPage = () => {
	const [isSignup, setIsSignup] = useState(false); // State to toggle between Login and Signup forms
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '', // Only needed for Signup
	});

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission (login/signup)
		alert(isSignup ? 'Account created successfully!' : 'Logged in successfully!');
	};

	return (
		<div className='login-signup-wrapper'>
			<Header />
			<main className="login-signup-container">
				<div className="form-wrapper">
					<h1>{isSignup ? 'Sign Up' : 'Log In'}</h1>

					{/* Toggle between login and signup */}
					<form onSubmit={handleSubmit} className="auth-form">
						{isSignup && (
							<input
								type="text"
								name="name"
								placeholder="Full Name"
								value={formData.name}
								onChange={handleInputChange}
								required
							/>
						)}
						<input
							type="email"
							name="email"
							placeholder="Email Address"
							value={formData.email}
							onChange={handleInputChange}
							required
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleInputChange}
							required
						/>
						<button type="submit" className="submit-btn">
							{isSignup ? 'Create Account' : 'Log In'}
						</button>
					</form>

					<div className="social-login">
						<p>Or login with:</p>
						<button className="social-btn google-btn">Login with Google</button>
						<button className="social-btn facebook-btn">Login with Facebook</button>
					</div>

					<div className="toggle-form">
						<p>
							{isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
							<span onClick={() => setIsSignup(!isSignup)}>
								{isSignup ? 'Log In' : 'Sign Up'}
							</span>
						</p>
					</div>

					{/* Link to Forgot Password */}
					{!isSignup && (
						<div className="forgot-password">
							<Link to="/forgot-password">Forgot Password?</Link>
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default LoginSignupPage;
