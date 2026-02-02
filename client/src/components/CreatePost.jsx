import React, { useState, useRef } from 'react';

const CreatePost = ({ onPostCreated }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text && !image) return;

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, image }),
            });

            if (response.ok) {
                setText('');
                setImage(null);
                setPreview(null);
                if (onPostCreated) onPostCreated();
            }
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                Create a Vibe
            </h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="glass-input w-full p-4 rounded-xl mb-4 h-32 resize-none"
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                {preview && (
                    <div className="mb-4 relative group">
                        <img src={preview} alt="Preview" className="rounded-xl w-full max-h-64 object-cover" />
                        <button
                            type="button"
                            onClick={() => { setImage(null); setPreview(null); }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        className="text-primary hover:text-white transition-colors flex items-center gap-2"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <span>📷</span> Add Image
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />

                    <button
                        type="submit"
                        disabled={loading || (!text && !image)}
                        className={`glass-button px-6 py-2 rounded-full font-semibold text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Posting...' : 'Post Vibe'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
