const Region = require('../models/regionModel');
const Event = require('../models/eventModel');

const event = async (req, res) => {
    try {
        const events = await Event.find();

        return res.status(200).json({ success: true, data: events });

    } catch (error) {

        return res.status(500).json({ success: false, error: 'Failed to fetch events' });
    }
}

const regionEvent = async (req, res) => {
    try {
        const { regionId } = req.body;

        const events = await Event.find({ regionId });

        return res.status(200).json({ success: true, data: events });

    } catch (error) {

        return res.status(500).json({ success: false, error: 'Failed to fetch events by region' });
    }
}

const getEvent = async (req, res) => {
    try {
        const { id } = req.body;

        const events = await Event.findById(id);

        return res.status(200).json({ success: true, data: events });

    } catch (error) {

        return res.status(500).json({ success: false, error: error.toString() });
    }
}

const createEvent = async (req, res) => {
    try {
        const { title, description, regionId } = req.body;

        const newEvent = new Event({
            title,
            description,
            regionId
        });

        const currentDate = new Date();

        const formattedDate = currentDate.toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        if (req.file) {
            newEvent.image = req.file.path;
        }

        newEvent.createdAt = formattedDate;

        await newEvent.save();

        return res.json({ success: true, message: 'Event created successfully.' });

    } catch (error) {

        return res.status(500).json({ success: false, message: 'Failed to create event.' });
    }
}

const updateEvent = async (req, res) => {
    const { id, title, description } = req.body;
    const { file } = req;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found.' });
        }

        event.title = title;
        event.description = description;

        if (file) {
            event.image = file.path;
        }

        await event.save();

        return res.json({ success: true, message: 'Event successfully updated.' });

    } catch (error) {

        return res.status(500).json({ success: false, message: error.toString() });
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.body;

    try {
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found.' });
        }

        return res.json({ success: true, message: 'Event successfully deleted.' });

    } catch (error) {

        return res.status(500).json({ success: false, message: error.toString() });
    }
}

const homeEvents = async (req, res) => {
    try {
        const regions = await Region.find().maxTimeMS(20000);
      
        const eventsPromises = regions.map(region => Event.find({ regionId: region._id }));
      
        const eventsResults = await Promise.all(eventsPromises);
      
        const data = regions.map((region, index) => {
          const newRegion = region.toObject();
          newRegion.events = eventsResults[index];
          return newRegion;
        });
      
        return res.json({ success: true, data: data });
      
      } catch (err) {
        
        return res.status(500).json({ success: false, error: err.toString() });
      }
}

module.exports = { event, regionEvent, getEvent, createEvent, updateEvent, deleteEvent, homeEvents }