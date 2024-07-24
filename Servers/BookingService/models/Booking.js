const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
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
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    collection: 'Bookings'
});

module.exports = mongoose.model('Booking', BookingSchema)