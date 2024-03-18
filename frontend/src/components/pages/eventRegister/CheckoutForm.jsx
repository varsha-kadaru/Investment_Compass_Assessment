import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "./eventRegister.css"
const CheckoutForm = ({ ticketQuantity }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Send paymentMethod.id to server for processing
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="pay" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
