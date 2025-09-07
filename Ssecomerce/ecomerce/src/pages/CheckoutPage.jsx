import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import "./checkoutPage.css";

import PaymentSummary from "./components/PaymentSummary";
import OrderSummary from "./components/OrderSummary";

const CheckoutPage = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getCheckoutData = async () => {
      let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
       setDeliveryOptions(response.data);
      
      response = await  axios.get("/api/payment-summary")
          setPaymentSummary(response.data);
    }
   getCheckoutData()
      

  }, []);

  return (
    <>
      <title>Checkout</title>

      <Header title="Checkout" />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
         <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>

          <PaymentSummary paymentSummary={ paymentSummary} />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
