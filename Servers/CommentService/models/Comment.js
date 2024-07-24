const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Events', 
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',   
        required: true 
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'Comments'
});

module.exports = mongoose.model('Comments', CommentSchema);