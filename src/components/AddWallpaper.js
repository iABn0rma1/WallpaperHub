import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddWallpaper.css';

const AddWallpaper = ({ addWallpaper }) => {
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate(); // Updated hook

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagArray = tags.split(',').map(tag => tag.trim());
        addWallpaper(url, tagArray);
        setUrl('');
        setName('');
        setTags('');
        // Redirect to home page after submitting
        navigate('/'); // Updated navigation
    };

    return (
        <form onSubmit={handleSubmit} className="add-wallpaper-form">
            <label htmlFor="url">Wallpaper URL:</label>
            <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter wallpaper URL"
            />

            <label htmlFor="name">Optional Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter wallpaper name (optional)"
            />

            <label htmlFor="tags">Tags (comma-separated):</label>
            <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags, e.g., nature, landscape"
            />
            <button type="submit">Add Wallpaper</button>
        </form>
    );
};

export default AddWallpaper;
