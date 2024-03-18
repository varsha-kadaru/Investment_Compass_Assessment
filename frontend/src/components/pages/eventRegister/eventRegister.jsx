import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios'; // Import axios
import "./eventRegister.css"

const stripePromise = loadStripe('your_stripe_publishable_key');

const baseTicketPrice = 50; // Example base ticket price

const EventRegistrationPage = () => {
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const handleTicketQuantityChange = (e) => {
    setTicketQuantity(parseInt(e.target.value));
  };

  const calculateTotalAmount = () => {
    return baseTicketPrice * ticketQuantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the axios post request
    try {
      const response = await axios.post('http://localhost:5000/api/eventRegister/register', {
        name: e.target.name.value,
        email: e.target.email.value,
        ticketQuantity: ticketQuantity,
        totalAmount: calculateTotalAmount()
      });
      console.log('Registration successful:', response.data);
      window.alert("Registration Succes")
      window.location.replace("/")
      // Optionally, redirect or display a success message
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <div className="event-registration-container">
      <h1>Event Registration</h1>
      <form className="event-registration-form" onSubmit={handleSubmit}>
        <label className="event-registration-label">
          Name:
          <input className="event-registration-input" type="text" name="name" />
        </label>
        <label className="event-registration-label">
          Email:
          <input className="event-registration-input" type="email" name="email" />
        </label>
        <label className="event-registration-label">
          Number of Tickets:
          <input
            className="event-registration-input"
            type="number"
            name="tickets"
            min="1"
            value={ticketQuantity}
            onChange={handleTicketQuantityChange}
          />
        </label>
        <p>Total Amount: ${calculateTotalAmount()}</p>
        <Elements stripe={stripePromise}>
          <CheckoutForm ticketQuantity={ticketQuantity} totalAmount={calculateTotalAmount()} />
        </Elements>
        <button className="event-registration-submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventRegistrationPage;
