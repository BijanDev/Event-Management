const Comment = require('../models/Comment.js');

// Add Comment to Event
exports.createComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        const savedComment = await comment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Get All Comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Get Comment By Id
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json('Comment not found');
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Update Comment
exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json('Comment not found');
        }
        const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, { $set: req.body }, { new: true });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json('Comment not found');
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('Comment deleted successfully');
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}