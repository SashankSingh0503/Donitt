import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Component/header";
import Footer from "../Component/footer";
import "./ordersummary.css"; 
import axios from "axios";

function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  let type = (location.state.type);
  const { cart } = location.state || { cart: [] };
    let totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 20);

  const handleBackToMenu = () => {
    navigate("/food-order");
  };

  const handleOrder = async () => {
    try {
        let data = {
            Order_Type: type,
            Total: totalPrice,
            Cart: cart
        }
      const response = await axios.post("http://localhost:5000/order", ( data ));
      if (response.data === "Order placed"){
        alert("Order Placed Successfully!");
        window.location.href = "/order-placed";
      }
      else if(response.data === "First Login"){
        window.location.href="/";
      }
      else if(response.data === "Not placed"){
        alert("Can not place order at this moment");
      }  
    } catch (error) {
      alert("Failed to place order.");
    }
  };

  return (
    <div>
      <Header />
      <div className="order-summary">
        <h2>{type} Summary</h2>
        <h3 style={{color:"red"}}>Delivery fees of 20 Rupees is fixed</h3>
        {cart.length > 0 ? (
          <div>
            <h3>Items in Your Cart:</h3>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span> 
                  <span>{item.quantity} x {item.price}</span> 
                  <span>Total: {item.quantity * item.price}</span>
                </li>
              ))}
            </ul>
            <h3>Total Price: {totalPrice}</h3>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <button className="back-button" onClick={handleBackToMenu}>Back to Menu</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="back-button" onClick={handleOrder}>Place order</button>
      </div>
      <Footer />
    </div>
  );
}

export default OrderSummary;
