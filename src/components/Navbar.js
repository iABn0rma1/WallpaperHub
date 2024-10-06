import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ onCollectionChange }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleSearch = (event) => {
		if (event.key === "Enter") {
			const collectionName = event.target.value.trim().toLowerCase();;
			if (collectionName) {
				onCollectionChange(collectionName); // Call the function passed from App
			}
		}
	};

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<nav className="navbar">
			<h1 className="navbar-title base">
				<Link to="/">WallpaperHub</Link>
			</h1>
			<div className="navbar-title responsive">
				<h1 className="navbar-title base">
					<Link to="/">WallpaperHub</Link>
				</h1>
				<button
					className="hamburger"
					onClick={toggleMenu}
				>
					{isMenuOpen ? "✖" : "☰"}
				</button>
			</div>
			<div className={`navbar-items ${isMenuOpen ? "open" : ""}`}>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/upload">Upload</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</div>
			<input
				type="text"
				placeholder="Search Collection"
				onKeyDown={handleSearch}
				className="search-input"
			/>
		</nav>
	);
};

export default Navbar;
