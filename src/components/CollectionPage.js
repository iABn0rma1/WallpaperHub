import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CollectionPage.css';

const CollectionPage = ({ wallpapers }) => {
    const { collectionName } = useParams();
    const navigate = useNavigate();

    // Find wallpapers that belong to this collection
    const collectionWallpapers = wallpapers.filter((wallpaper) =>
        wallpaper.tags.includes(collectionName)
    );

    // Function to handle the download
    const handleDownload = async (imageUrl) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = `wallpaper-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(urlBlob);
    };

    const handleWallpaperClick = (url) => {
        navigate(`/wallpaper/${encodeURIComponent(url)}`);
    };

    return (
        <div className="collection-page">
            <h1>{collectionName} Collection</h1>
            <div className="wallpapers-grid">
                {collectionWallpapers.map((wallpaper) => (
                    <div key={wallpaper.url} className="wallpaper-card">
                        <img
                            src={wallpaper.url}
                            alt={collectionName}
                            className="collection-wallpaper"
                            loading="lazy"
                            onClick={() => handleWallpaperClick(wallpaper.url)}
                        />
                        <button
                            className="download-btn"
                            onClick={() => handleDownload(wallpaper.url)}
                        >
                            Download
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionPage;
