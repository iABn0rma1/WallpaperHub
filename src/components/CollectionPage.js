import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CollectionPage.css";

const CollectionPage = () => {
    const { collectionName } = useParams();
    const [collectionWallpapers, setCollectionWallpapers] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const fetchWallpapers = async (name) => {
        try {
            const response = await fetch("https://wallpaperapi-3zy0.onrender.com/api/wallpapers");
            if (!response.ok) {
                throw new Error("Failed to fetch wallpapers");
            }
            const allWallpapers = await response.json();
            const filteredWallpapers = allWallpapers.filter((wallpaper) =>
                wallpaper.tags.includes(name)
            );
            setCollectionWallpapers(filteredWallpapers);
        } catch (error) {
            console.error("Error fetching wallpapers:", error);
            setError("No wallpapers found for this collection.");
        }
    };

    const handleDownload = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error("Failed to download image.");
            }
            const blob = await response.blob();
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = urlBlob;
            a.download = `wallpaper-${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.error("Error downloading image:", error);
        }
    };

    const handleWallpaperClick = (id) => {
        navigate(`/wallpaper/${id}`);
    };

    useEffect(() => {
        fetchWallpapers(collectionName);
    }, [collectionName]);

    return (
        <div className="collection-page">
            <h1>{collectionName} Collection</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <div className="wallpapers-grid">
                    {collectionWallpapers.length > 0 ? (
                        collectionWallpapers.map((wallpaper) => (
                            <div key={wallpaper._id} className="wallpaper-card">
                                <img
                                    src={wallpaper.imageUrl}
                                    alt={collectionName}
                                    className="collection-wallpaper"
                                    loading="lazy"
                                    onClick={() => handleWallpaperClick(wallpaper._id)}
                                />
                                <button
                                    className="download-btn"
                                    onClick={() => handleDownload(wallpaper.imageUrl)}
                                >
                                    Download
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No wallpapers found for this collection.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CollectionPage;
