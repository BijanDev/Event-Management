const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: "Events"
});

EventSchema.index({ title: 1, date: 1, location: 1 }, { unique: true });

module.exports = mongoose.model('Events', EventSchema);