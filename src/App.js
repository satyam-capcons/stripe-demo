"use client"
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NYpT8SBmdZWwSx48Kf7BohBDAj9pVVkylgODgxXYtjiTLQWgbCfMtbmXI3InImOJFAGw5gp6UYRJKFor02BZHBG00wEpr6RpX");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {



    // Create PaymentIntent as soon as the page loads
    fetch("https://b3aa-2401-4900-6281-644f-9957-fd98-1a42-24a8.ngrok-free.app/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: 'xyz', skuId: 'abc', size: 'large', quantity: 5, amount: 1000 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
