// models/EventRegistration.js
const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  ticketQuantity: {
    type: Number,
    required: true
  },
  totalAmount:{
    type:Number,
    default:0
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

module.exports = EventRegistration;
