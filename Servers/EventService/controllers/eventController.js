const Event = require("../models/Event.js");
const client = require("../Redis/redisClient.js");

// Create Event
const createEvent = async (req, res) => {
    try {
        // Check for duplicate event
        const existingEvent = await Event.findOne({
            title: req.body.title,
            // date: req.body.date,
            location: req.body.location
        });

        if (existingEvent) {
            return res.status(409).json("Event already exists");
        }

        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();

        // Cache the new event data in Redis
        const redisKey = `event:${savedEvent._id}`;
        await client.setEx(redisKey, 3600, JSON.stringify(savedEvent));

        res.status(200).json(savedEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Get All Events
const getEvents = async (req, res) => {
    try {
        const redisKey = "event";

        // Check if events data is in Redis cache
        const cachedData = await client.get(redisKey);
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        } else {
            const events = await Event.find();
            if (!events) {
                return res.status(404).json("Events not found");
            }
            await client.setEx(redisKey, 3600, JSON.stringify(events));
            return res.status(200).json(events);
        }
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

// Get Eventas By Id
const getEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const redisKey = `event:${eventId}`;

        // Check if event data is in Redis cache
        const cachedData = await client.get(redisKey);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        } else {
            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json("Event not found");
            }

            // Cache the event data in Redis
            await client.setEx(redisKey, 3600, JSON.stringify(event));
            return res.status(200).json(event);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json("Internal Server Error");
    }
};

// Update Event
const updateEvent = async (req, res) => {
    try {
        const enevtId = req.params.eventId;
        const existingEvent = await Event.findById(enevtId);
        if (!existingEvent) {
            return res.status(404).json("Event not found");
        }
        const updateEvent = await Event.findByIdAndUpdate(enevtId, req.body, { new: true });
        return res.status(200).json(updateEvent);
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

// Delete Event
const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const existingEvent = await Event.findById(eventId);
        if (!existingEvent) {
            return res.status(404).json("Event not found");
        }
        await Event.findByIdAndDelete(eventId);
        return res.status(200).json("Event deleted successfully");
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
}