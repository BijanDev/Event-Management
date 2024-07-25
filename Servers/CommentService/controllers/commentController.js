const Comment = require('../models/Comment.js');
const redisClient = require('../Redis/redisClient.js');

// Add Comment to Event
exports.createComment = async (req, res) => {
    try {
        const redisKey = 'comments';
        const comment = new Comment(req.body);
        const savedComment = await comment.save();
        await redisClient.del(redisKey);
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Get All Comments
exports.getAllComments = async (req, res) => {
    try {
        const redisKey = 'comments';
        const cachedData = await redisClient.get(redisKey);
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        } else {
            const comments = await Comment.find();
            if (!comments) {
                return res.status(404).json('Comments not found');
            }
            await redisClient.setEx(redisKey, 3600, JSON.stringify(comments));
            res.status(200).json(comments);
        }
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Get Comment By Id
exports.getCommentById = async (req, res) => {
    try {
        const redisKey = `comment:${req.params.id}`;
        const cachedata = await redisClient.get(redisKey);
        if (cachedata) {
            return res.status(200).json(JSON.parse(cachedata));
        } else {
            const comment = await Comment.findById(req.params.commentId);
            if (!comment) {
                return res.status(404).json('Comment not found');
            }
            await redisClient.setEx(redisKey, 3600, JSON.stringify(comment));
            res.status(200).json(comment);
        }
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Update Comment
exports.updateComment = async (req, res) => {
    try {
        const redisKey = `comment:${req.params.id}`;
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json('Comment not found');
        }
        const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, { $set: req.body }, { new: true });
        await redisClient.del(redisKey);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        const redisKey = `comment:${req.params.id}`;
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json('Comment not found');
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        await redisClient.del(redisKey);
        res.status(200).json('Comment deleted successfully');
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}