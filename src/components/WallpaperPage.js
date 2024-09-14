// WallpaperPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/WallpaperPage.css';

const WallpaperPage = ({ wallpapers }) => {
    const { url } = useParams();
    const decodedUrl = decodeURIComponent(url);

    // Find the wallpaper by URL
    const wallpaper = wallpapers.find(({ url }) => url === decodedUrl);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = wallpaper.url;
        link.download = wallpaper.url.split('/').pop(); // Use the file name from the URL
        link.click();
    };

    return (
        <div className="wallpaper-page">
            {wallpaper ? (
                <>
                    <img src={wallpaper.url} alt="Wallpaper" className="full-wallpaper-image" />
                    <button className="download-button" onClick={handleDownload}>
                        Download
                    </button>
                </>
            ) : (
                <p>Wallpaper not found.</p>
            )}
        </div>
    );
};

export default WallpaperPage;
