// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = ({ wallpapers }) => {
    // Function to group wallpapers by tags
    const groupByTag = (wallpapers) => {
        const collections = {};

        wallpapers.forEach(({ url, tags }) => {
            tags.forEach(tag => {
                if (!collections[tag]) {
                    collections[tag] = { urls: [], coverImage: url }; // Use the first image as the cover image
                }
                collections[tag].urls.push(url);
            });
        });

        return collections;
    };

    const collections = groupByTag(wallpapers);

    return (
        <div className="home-page">
            <h1>Wallpaper Collections</h1>
            {Object.keys(collections).length > 0 ? (
                Object.keys(collections).map(tag => (
                    <div key={tag} className="collection">
                        <Link to={`/collection/${tag}`}>
                            <div className="collection-cover">
                                <img src={collections[tag].coverImage} alt={tag} className="cover-image" />
                                <div className="cover-overlay">
                                    <span>{collections[tag].urls.length} Wallpapers</span>
                                </div>
                            </div>
                            <h2>{tag}</h2>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No collections available. Add some wallpapers to see them here.</p>
            )}
        </div>
    );
};

export default HomePage;
