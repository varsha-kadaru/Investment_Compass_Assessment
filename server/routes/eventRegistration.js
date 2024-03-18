// routes/eventRegistration.js
const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/EventRegistration');

// Route for handling event registration
router.post('/register', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, ticketQuantity,totalAmount } = req.body;

    // Create a new event registration instance
    const newRegistration = new EventRegistration({
      name,
      email,
      ticketQuantity,
      totalAmount
    });

    // Save the event registration to the database
    await newRegistration.save();

    // Send a success response
    res.status(201).json({ message: 'Event registration successful' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/', async (req, res) => {
    try {
      // Fetch all registrations from the database
      const registrations = await EventRegistration.find();
  
      // Send the registrations as the response
      res.status(200).json(registrations);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;
