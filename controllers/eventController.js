const FoodCharityEvent = require("../models/Event");

// Create a new event
exports.createEvent = async (req, res) => {

  try {
    const { title, description, startDate, endDate, startTime,endTime, location, contact, imageUrl} = req.body;
    
    const newEvent = new FoodCharityEvent({
      title,
      postedBy: req.user.userId, // Assuming userId is available in req.user
      description,
      startDate,
      endDate,
      startTime,
      location,
      contact,
      endTime,
      imageUrl
      
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {


  try {
    const events = await FoodCharityEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await FoodCharityEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update event details
exports.updateEvent = async (req, res) => {
  try {
    const event = await FoodCharityEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const { title, description, startDate, endDate, time, location, contact, images } = req.body;

    event.title = title;
    event.description = description;
    event.startDate = startDate;
    event.endDate = endDate;
    event.time = time;
    event.location = location;
    event.contact = contact;
    event.images = images;

    await event.save();
    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await FoodCharityEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.remove();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
