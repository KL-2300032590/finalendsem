import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  createEventInCategory,
  updateEventInCategory,
  createCategory,
  deleteEventInCategory,
  getRegisteredEvents,
} from "../controllers/events.controller.js";

const router = express.Router();

// Place specific routes before parameterized routes
// This route should come before /:id
router.get("/registered", protect, getRegisteredEvents);

// Create a new event
router.post("/", createEvent);

// Get all events
router.get("/", getAllEvents);

// Routes with parameters should come after specific routes
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

// Category and event registration routes
router.post("/category", createCategory);
router.post("/:categoryId/events", createEventInCategory);
router.put("/:categoryId/events/:eventId", updateEventInCategory);
router.delete("/:categoryId/events/:eventId", deleteEventInCategory);
router.put("/:categoryId/events/:eventId/register", protect, registerForEvent);

export default router;
