import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HomePage.css";

const HomePage = () => {
	const [wallpapers, setWallpapers] = useState([]);
	const navigate = useNavigate();

	const fetchWallpapers = async () => {
		try {
			const response = await axios.get(
				"https://wallpaperapi-3zy0.onrender.com/api/wallpapers"
			);
			setWallpapers(response.data);
		} catch (error) {
			console.error("Error fetching wallpapers:", error);
		}
	};

	useEffect(() => {
		fetchWallpapers(); // Call fetchWallpapers on component mount
	}, []);

	// Create a map of collections based on tags
	const collections = wallpapers.reduce((acc, wallpaper) => {
		wallpaper.tags.forEach((tag) => {
			if (!acc[tag]) {
				acc[tag] = { tag, wallpapers: [wallpaper] };
			} else {
				acc[tag].wallpapers.push(wallpaper);
			}
		});
		return acc;
	}, {});

	const handleCollectionClick = (collectionName) => {
		navigate(`/collection/${collectionName}`);
	};

	return (
		<div className="home-page">
			<h1>Wallpaper Collections</h1>
			<div className="collections-grid">
				{Object.keys(collections).map((collectionName) => {
					const collection = collections[collectionName];
					const coverImage = collection.wallpapers[0]?.imageUrl || ""; // Updated to imageUrl
					const totalWallpapers = collection.wallpapers.length;

					return (
						<div
							key={collectionName}
							className="collection-card"
							onClick={() =>
								handleCollectionClick(collectionName)
							}
						>
							<div className="image-container">
								<img
									src={coverImage}
									alt={collectionName}
									className="cover-image"
									loading="lazy"
								/>
								<div className="overlay">
									<div className="overlay-text">
										<p>{collectionName}</p>
										<p>{totalWallpapers} wallpapers</p>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage;
