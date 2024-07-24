const eventRoute = require('express').Router();
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

eventRoute.post('/events', protect, createEvent);
eventRoute.get('/events', protect, getEvents);
eventRoute.get('/events/:eventId', protect, getEventById);
eventRoute.put('/events/:eventId', protect, updateEvent);
eventRoute.delete('/events/:eventId', protect, deleteEvent);

module.exports = eventRoute;