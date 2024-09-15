import React from 'react';
import '../styles/WallpaperCollection.css';

const WallpaperCollection = ({ wallpapers }) => {
    return (
        <div className="wallpaper-collection">
            {wallpapers.map((wallpaper, index) => (
                <img key={index} src={wallpaper.url} alt="Wallpaper" className="wallpaper" />
            ))}
        </div>
    );
};

export default WallpaperCollection;
