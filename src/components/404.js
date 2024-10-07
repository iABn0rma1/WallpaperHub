import React, { useEffect, useState } from "react";
import "../styles/404.css";

const NotFoundPage = () => {
	const [randomImage, setRandomImage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchRandomImage = async () => {
			try {
				const response = await fetch(
					"https://wallpaper-api-gamma.vercel.app/api/404-images"
				);
				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(
						`HTTP error! Status: ${response.status} - ${errorText}`
					);
				}
				const data = await response.json();
				if (data.length === 0) {
					throw new Error("No images found");
				}
				const randomIndex = Math.floor(Math.random() * data.length);
				setRandomImage(data[randomIndex]);
			} catch (err) {
				console.error("Error fetching random image:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRandomImage();
	}, []);

	return (
		<div className="not-found-page">
			{loading ? (
				<h2>Loading...</h2>
			) : error ? (
				<h2>Error: {error}</h2>
			) : (
				<>
					{randomImage && (
						<img
							src={randomImage}
							alt="404 Not Found"
							className="random-image"
						/>
					)}
					<h1>Oops! Page Not Found</h1>
					<p>Sorry, the page you're looking for doesn't exist.</p>
					<a
						href="/"
						className="home-link"
					>
						Go to Home
					</a>
				</>
			)}
		</div>
	);
};

export default NotFoundPage;
