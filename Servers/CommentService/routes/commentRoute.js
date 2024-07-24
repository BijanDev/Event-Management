const express = require('express');
const { createComment, getAllComments, getCommentById, updateComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const commentRoute = express.Router();

commentRoute.post('/comments', protect, createComment);
commentRoute.get('/comments', protect, getAllComments);
commentRoute.get('/comments/:commentId', protect, getCommentById);
commentRoute.put('/comments/:commentId', protect, updateComment);
commentRoute.delete('/comments/:commentId', protect, deleteComment);

module.exports = commentRoute;