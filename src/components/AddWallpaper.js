// AddWallpaper.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddWallpaper.css';

const AddWallpaper = ({ addWallpaper }) => {
    const [url, setUrl] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate(); // Updated hook

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagArray = tags.split(',').map(tag => tag.trim());
        addWallpaper(url, tagArray);
        setUrl('');
        setTags('');

        // Redirect to home page after submitting
        navigate('/'); // Updated navigation
    };

    return (
        <form onSubmit={handleSubmit} className="add-wallpaper-form">
            <input
                type="text"
                value={url}
                placeholder="Enter wallpaper URL"
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <input
                type="text"
                value={tags}
                placeholder="Enter tags (comma-separated)"
                onChange={(e) => setTags(e.target.value)}
                required
            />
            <button type="submit">Add Wallpaper</button>
        </form>
    );
};

export default AddWallpaper;
