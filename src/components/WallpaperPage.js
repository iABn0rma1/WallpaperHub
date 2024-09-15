import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/WallpaperPage.css';

const WallpaperPage = ({ wallpapers }) => {
    const { url } = useParams();
    const decodedUrl = decodeURIComponent(url);
    const [imageLoading, setImageLoading] = useState(true);

    // Find the wallpaper by URL
    const wallpaper = wallpapers.find(({ url }) => url === decodedUrl);

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

    return (
        <div className="wallpaper-page">
            {wallpaper ? (
                <div className="wallpaper-container">
                    {/* Skeleton loading */}
                    {imageLoading && <Skeleton height={600} width={800} />}
                    <img
                        src={wallpaper.url}
                        alt="Wallpaper"
                        className="full-wallpaper-image"
                        loading="lazy"
                        onLoad={() => setImageLoading(false)}
                        style={imageLoading ? { display: 'none' } : {}}
                    />

                    {/* Download Button */}
                    <button
                        className="download-button"
                        onClick={() => handleDownload(wallpaper.url)}
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
