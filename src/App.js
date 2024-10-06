import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddWallpaper from "./components/AddWallpaper";
import HomePage from "./components/HomePage";
import CollectionPage from "./components/CollectionPage";
import WallpaperPage from "./components/WallpaperPage";
import NotFoundPage from "./components/404";
import "./styles/App.css";
import AboutPage from "./components/About";

const App = () => {
	const [wallpapers, setWallpapers] = useState([]);

	const addWallpaper = (url, tags) => {
		setWallpapers([...wallpapers, { url, tags }]);
	};

	// Function to update collection name and navigate
	const updateCollection = (collectionName) => {
		window.location.href = `/collection/${collectionName}`; // Directly navigate
	};

	return (
		<Router>
			<div className="App">
				<Navbar onCollectionChange={updateCollection} />
				<Routes>
					<Route
						path="/"
						element={<HomePage wallpapers={wallpapers} />}
					/>
					<Route
						path="/upload"
						element={<AddWallpaper addWallpaper={addWallpaper} />}
					/>
					<Route
						path="/about"
						element={<AboutPage />}
					/>
					<Route
						path="/collection/:collectionName"
						element={<CollectionPage wallpapers={wallpapers} />}
					/>
					<Route
						path="/wallpaper/:id"
						element={<WallpaperPage />}
					/>
					<Route
						path="*"
						element={<NotFoundPage />}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
