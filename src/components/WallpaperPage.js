import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/WallpaperPage.css";

const WallpaperPage = () => {
	const { id } = useParams(); // Use 'id' to fetch the wallpaper
	const [wallpaper, setWallpaper] = useState(null);
	const [imageLoading, setImageLoading] = useState(true);

	// Fetch wallpaper from the backend
	const fetchWallpaper = async () => {
		try {
			const response = await fetch(
				`https://wallpaperapi-3zy0.onrender.com/api/wallpapers/${id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (!response.ok) {
				throw new Error(
					`Failed to fetch wallpaper: ${response.statusText}`
				);
			}
			const data = await response.json();
			setWallpaper(data);
		} catch (error) {
			console.error("Error fetching wallpaper:", error);
		}
	};

	useEffect(() => {
		fetchWallpaper();
	}, [id]);

	// Function to handle the download with CORS support
	const handleDownload = async (imageUrl) => {
		try {
			// Make the fetch request for the image
			const response = await fetch(imageUrl, {
				method: "GET",
				mode: "cors", // Ensure CORS mode is enabled
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`Failed to download image: ${response.statusText}`);
			}
			const blob = await response.blob(); // Get image as blob
			const urlBlob = window.URL.createObjectURL(blob); // Create a local URL

			// Create a temporary link element to initiate download
			const a = document.createElement("a");
			a.href = urlBlob;
			a.download = `wallpaper-${Date.now()}.jpg`; // Set download file name
			document.body.appendChild(a); // Append the link to the body
			a.click(); // Trigger the download
			document.body.removeChild(a); // Remove the link after download

			// Revoke the object URL to avoid memory leaks
			window.URL.revokeObjectURL(urlBlob);
		} catch (error) {
			console.error("Error downloading image:", error);
		}
	};

	return (
		<div className="wallpaper-page">
			{wallpaper ? (
				<div className="wallpaper-container">
					{/* Skeleton loading */}
					{imageLoading && (
						<Skeleton
							height={600}
							width={800}
						/>
					)}
					<img
						src={wallpaper.imageUrl} // URL fetched from backend
						alt="Wallpaper"
						className="full-wallpaper-image"
						loading="lazy"
						onLoad={() => setImageLoading(false)}
						style={imageLoading ? { display: "none" } : {}}
					/>

					{/* Download Button */}
					<button
						className="download-button"
						onClick={() => handleDownload(wallpaper.imageUrl)}
					>
						Download Wallpaper
					</button>
				</div>
			) : (
				<p>Wallpaper not found.</p>
			)}
		</div>
	);
};

export default WallpaperPage;
