const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getAllEvents,
} = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new event
router.post("/create", authMiddleware, createEvent);

// Get event by ID
router.get("/:id", authMiddleware, getEventById);

// Update event details
router.put("/:id", authMiddleware, updateEvent);

// Delete event
router.delete("/:id", authMiddleware, deleteEvent);

// Get all events
router.get("/", getAllEvents);

module.exports = router;
