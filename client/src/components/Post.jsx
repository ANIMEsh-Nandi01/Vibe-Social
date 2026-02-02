import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="glass-panel p-6 mb-6 transform transition-all hover:scale-[1.01]">
            {/* Header/User Info (Mock) */}
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 mr-3"></div>
                <div>
                    <h4 className="font-bold text-white">Anonymous User</h4>
                    <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
            </div>

            {/* Content */}
            <p className="text-gray-200 mb-4 whitespace-pre-wrap leading-relaxed">{post.text}</p>

            {/* Image */}
            {post.image && (
                <div className="rounded-xl overflow-hidden mt-3 border border-[rgba(255,255,255,0.1)]">
                    <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-auto object-cover max-h-[500px]"
                        loading="lazy"
                    />
                </div>
            )}

            {/* Actions (Mock) */}
            <div className="flex mt-4 gap-4 text-gray-400 text-sm">
                <button className="hover:text-pink-500 transition-colors">Like</button>
                <button className="hover:text-blue-400 transition-colors">Comment</button>
                <button className="hover:text-green-400 transition-colors">Share</button>
            </div>
        </div>
    );
};

export default Post;
