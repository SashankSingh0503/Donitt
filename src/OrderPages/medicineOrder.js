import React, { useState } from "react";
import Header from "../Component/header";
import Footer from "../Component/footer";
// import axios from "axios"; 
import "./medicineOrder.css";
import { useNavigate } from "react-router-dom";

function MedicineOrder() {
   const navigate = useNavigate();  
    const [cart, setCart] = useState([]);
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(""); 
  

  const products = [
    { name: "ORS Packet", description: "Orange flavoured ORS Powder.", price: "15 rupees", imgSrc: "./images/ors.jpg" },
    { name: "Cooton rolls", description: "High quality cotton rolls.", price: "20 rupees", imgSrc: "./images/cotton.jpg" },
    { name: "Cough Syrup", description: "Relieves cough and sore throat.", price: "125 rupees", imgSrc: "./images/syrup.jpg" },
    { name: "Band-Aid", description: "For cuts and bruises.", price: "5 rupees", imgSrc: "./images/bandaids.jpg" },
    { name: "Antiseptic Cream", description: "For minor wounds and cuts.", price: "20 rupees", imgSrc: "./images/cream.jpg" },
    { name: "Dettol", description: "Best for cleaning wounds.", price: "50 rupees", imgSrc: "./images/dettol.jpg" },
    { name: "Hand Wash", description: "Kills germs and bacteria.", price: "30 rupees", imgSrc: "./images/handwash.jpg" },
    { name: "Disprin", description: "Instant pain releif tablets(500mg).", price: "10 rupees", imgSrc: "./images/disprin.jpg" },
    { name: "Glucond", description: "Orange flavour glucond", price: "20 rupees", imgSrc: "./images/glucond.jpg" },
    { name: "Itch gaurd cream", description: "Solution for itching relief.", price: "60 rupees", imgSrc: "./images/itch.jpg" },
    { name: "Paracetamol", description: "Paracetamol tablets (500mg).", price: "10 rupees", imgSrc: "./images/pcm.jpg" },
    { name: "Sunscreem", description: "All time skin protection.", price: "160 rupees", imgSrc: "./images/sunscream.jpg" }
  ];

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setAlertMessage(`${item.name} added to cart!`);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const decreaseQuantity = (name) => {
    const updatedCart = cart.map(item => {
      if (item.name === name && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const deleteItem = (name) => {
    const updatedCart = cart.filter(item => item.name !== name);
    setCart(updatedCart);
  };

  // const handleOrder = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/medicineOrder", { cart });
  //     if (response.data === "Order placed")
  //           alert("Order Placed Successfully!");  
  //     setCart([]);
  //   } catch (error) {
  //     alert("Failed to place order.");
  //   }
  // };

  const handleOrder = async () => {
    try {
      navigate("/order-summary", { state: { cart , type:"Medicine-Order"} }); 
      setCart([]);
    } catch (error) {
      alert("Failed to place order.");
    }
  };

  return (
    <div>
      <Header />
      {showAlert && (
        <div className="alert">
          <span>{alertMessage}</span>
        </div>
      )}
      <div className="main-tiles">
        {products.map((product, index) => (
          <div className="tile" key={index}>
            <img src={product.imgSrc} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">{product.price}</div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h3>Cart:</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <span>{item.name} - {item.price} (x{item.quantity})</span>
                <div className="cart-buttons">
                  <button onClick={() => decreaseQuantity(item.name)}>-</button>
                  <button onClick={() => deleteItem(item.name)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
        <button className="order-button" onClick={handleOrder}>
          Place Order
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default MedicineOrder;
