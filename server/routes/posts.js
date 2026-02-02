const router = require('express').Router();
const Post = require('../models/Post');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a post
router.post('/', async (req, res) => {
    try {
        // Validate that at least text or image is present
        if (!req.body.text && !req.body.image) {
            return res.status(400).json({ message: "Post must contain text or image" });
        }
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
