const express = require('express');
const { bookEvent, getAllBookings, getBookingById, getUserBookings, getEventBookings, cancelBooking, updateBooking } = require('../controllers/bookingControllers');
const { protect } = require('../middleware/authMiddleware');
const bookingRoutes = express.Router();

bookingRoutes.post('/bookings', protect, bookEvent);
bookingRoutes.get('/bookings', protect, getAllBookings);
bookingRoutes.get('/bookings/:bookingId', protect, getBookingById);
bookingRoutes.get('/bookings/:userId', protect, getUserBookings);
bookingRoutes.get('/bookings/:eventId', protect, getEventBookings);
bookingRoutes.put('/bookings/:bookingId', protect, updateBooking);
bookingRoutes.delete('/bookings/:bookingId', protect, cancelBooking);

module.exports = bookingRoutes;