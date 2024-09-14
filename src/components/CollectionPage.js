// CollectionPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CollectionPage.css';

const CollectionPage = ({ wallpapers }) => {
    const { collectionName } = useParams();
    const navigate = useNavigate();

    // Filter wallpapers by the collection (tag)
    const filteredWallpapers = wallpapers.filter(({ tags }) => tags.includes(collectionName));

    const handleImageClick = (url) => {
        navigate(`/wallpaper/${encodeURIComponent(url)}`);
    };

    return (
        <div className="collection-page">
            <h1>{collectionName} Collection</h1>
            <div className="collection-wallpapers">
                {filteredWallpapers.length > 0 ? (
                    filteredWallpapers.map(({ url }, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Wallpaper ${index}`}
                            className="wallpaper-image"
                            onClick={() => handleImageClick(url)}
                        />
                    ))
                ) : (
                    <p>No wallpapers in this collection.</p>
                )}
            </div>
        </div>
    );
};

export default CollectionPage;
