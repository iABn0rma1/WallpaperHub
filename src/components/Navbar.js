import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ onCollectionChange }) => {
	const navigate = useNavigate();

	const handleSearch = (event) => {
		if (event.key === "Enter") {
			const collectionName = event.target.value.trim();
			if (collectionName) {
				onCollectionChange(collectionName); // Call the function passed from App
			}
		}
	};

	return (
		<nav className="navbar">
			<h1 className="navbar-title">
				<Link to="/">WallpaperHub</Link>
			</h1>
			<div className="navbar-items">
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
				<input
					type="text"
					placeholder="Search Collection"
					onKeyDown={handleSearch}
					className="search-input"
				/>
			</div>
		</nav>
	);
};

export default Navbar;
