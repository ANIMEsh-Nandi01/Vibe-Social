import React, { useState, useEffect } from 'react';
import Post from './Post';
import CreatePost from './CreatePost';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto pt-10 px-4 pb-20">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2 drop-shadow-lg">
                    Vibe Social
                </h1>
                <p className="text-gray-400">Share your moments in style</p>
            </div>

            <CreatePost onPostCreated={fetchPosts} />

            {loading ? (
                <div className="text-center text-gray-500 mt-10">Loading vibes...</div>
            ) : (
                <div className="flex flex-col">
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}

                    {posts.length === 0 && (
                        <div className="glass-panel p-10 text-center text-gray-400">
                            No vibes yet. Be the first to post!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Feed;
