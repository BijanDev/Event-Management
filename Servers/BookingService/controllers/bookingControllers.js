const Bookings = require('../models/Booking.js');

// Book Event
exports.bookEvent = async (req, res) => {
    try {
        const booking = new Bookings(req.body);
        const savedBooking = await booking.save();
        res.status(200).json(savedBooking);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Get All Bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Bookings.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Get Booking By Id
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Bookings.findById(req.params.bookingId);
        if (!booking) {
            return res.status(404).json('Booking not found');
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Get All Bookings for a User
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Bookings.find({ userId: req.params.userId });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Get All Bookings for an Event
exports.getEventBookings = async (req, res) => {
    try {
        const bookings = await Bookings.find({ eventId: req.params.eventId });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Update Booking
exports.updateBooking = async (req, res) => {
    try {
        const booking = await Bookings.findById(req.params.bookingId);
        if (!booking) {
            return res.status(404).json('Booking not found');
        }
        const updatedBooking = await Bookings.findByIdAndUpdate(req.params.bookingId, { $set: req.body }, { new: true });
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

// Cancel Booking
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Bookings.findById(req.params.bookingId);
        if (!booking) {
            return res.status(404).json('Booking not found');
        }
        await Bookings.findByIdAndDelete(req.params.bookingId);
        res.status(200).json('Booking canceled successfully');
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}