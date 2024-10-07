import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddWallpaper.css";

const AddWallpaper = () => {
	const [url, setUrl] = useState("");
	const [name, setName] = useState("");
	const [tags, setTags] = useState("");
	const [message, setMessage] = useState(""); // To hold success/error messages
	const [error, setError] = useState(false); // To toggle error message
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Convert tags to lowercase, replace spaces with hyphens, and split into an array
		const tagArray = tags
			.split(",")
			.map((tag) => tag.trim().toLowerCase().replace(/\s+/g, "-")); // Replace spaces with hyphens

		try {
			await axios.post(
				"https://wallpaper-api-gamma.vercel.app/api/wallpapers",
				{
					imageUrl: url,
					name: name || undefined,
					tags: tagArray,
				}
			);

			// Reset fields and display success message
			setUrl("");
			setName("");
			setTags("");
			setMessage("Wallpaper added successfully!"); // Success message
			setError(false); // Reset error state
			navigate("/"); // Redirect to home page after submitting
		} catch (error) {
			console.error("Error adding wallpaper:", error);
			setMessage("Failed to add wallpaper. Please try again."); // Error message
			setError(true);
		}
	};

	// Button should be disabled if the URL is empty
	const isSubmitDisabled = !url.trim();

	return (
		<div className="add-wallpaper-page">
			<form
				onSubmit={handleSubmit}
				className="add-wallpaper-form"
			>
				<label htmlFor="url">* Wallpaper URL:</label>
				<input
					type="text"
					id="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="https://i-abnormal.netlify.app/images/icon.webp"
				/>

				<label htmlFor="name">Name (Optional):</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Wallpaper Name"
				/>

				<label htmlFor="tags">* Tags (comma-separated):</label>
				<input
					type="text"
					id="tags"
					value={tags}
					onChange={(e) => setTags(e.target.value)}
					placeholder="nature, landscape, animal, video-game"
				/>

				<button
					type="submit"
					disabled={isSubmitDisabled}
					className="submit-button"
				>
					Add Wallpaper
				</button>

				{/* Display success or error message */}
				{message && (
					<div
						className={error ? "error-message" : "success-message"}
					>
						{message}
					</div>
				)}
			</form>
		</div>
	);
};

export default AddWallpaper;
