import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddWallpaper from './components/AddWallpaper';
import HomePage from './components/HomePage';
import CollectionPage from './components/CollectionPage';
import WallpaperPage from './components/WallpaperPage';
import './styles/App.css';

const App = () => {
    const [wallpapers, setWallpapers] = useState([]);

    const addWallpaper = (url, tags) => {
        setWallpapers([...wallpapers, { url, tags }]);
    };

    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/add-wallpaper">Add Wallpaper</Link></li>
                    </ul>
                </nav>

                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<HomePage wallpapers={wallpapers} />} />
                        <Route path="/add-wallpaper" element={<AddWallpaper addWallpaper={addWallpaper} />} />
                        <Route path="/collection/:collectionName" element={<CollectionPage wallpapers={wallpapers} />} />
                        <Route path="/wallpaper/:url" element={<WallpaperPage wallpapers={wallpapers} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
