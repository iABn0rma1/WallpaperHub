import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = ({ wallpapers }) => {
    const navigate = useNavigate();

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
                    const coverImage = collection.wallpapers[0]?.url || '';
                    const totalWallpapers = collection.wallpapers.length;

                    return (
                        <div
                            key={collectionName}
                            className="collection-card"
                            onClick={() => handleCollectionClick(collectionName)}
                        >
                            <div className="image-container">
                                <img src={coverImage} alt={collectionName} className="cover-image" loading="lazy" />
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
