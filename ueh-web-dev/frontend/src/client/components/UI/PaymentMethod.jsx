import React from "react";
import {useNavigate} from "react-router-dom";


import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = (orderData, itemsData) => {
  const navigate = useNavigate();
  const createorder = axios.create({
    baseURL: import.meta.env.VITE_DOMAIN_BACKEND
  });

  const handleCreateOrder = async () => {
    try {
        const response = await createorder.post('/orders/create-order/', {
            order: orderData,
            items: itemsData
        });
        navigate(`/confirmation/${response.data.orderId}`);

    } catch (error) {
        console.error('Error creating order:', error);
    }
};

  const handleButtonClick = () => {
    navigate("/confirmation");
  };
  return (
    <>
      <div className="payment">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Cheque Payment
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Master Card
        </label>

        <img src={masterCard} alt="" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Paypal
        </label>

        <img src={paypal} alt="" />
      </div>
      <div className="payment text-end mt-5">
        <button onClick={handleCreateOrder}>Reserve Now</button>
      </div>
    </>
  );
};

export default PaymentMethod;
