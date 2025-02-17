import React, { useState } from "react";
import Header from "../Component/header";
import Footer from "../Component/footer";
import axios from "axios"; 
import "./medicineOrder.css";

function FoodOrder() {
  const [cart, setCart] = useState([]);

  const products = [
  { name: "Plain Dosa", description: "A crunchy and thin dosa.", price: 50, imgSrc: "./images/dosa-1.jpg" },
  { name: "Masala Dosa", description: "A dosa with potato filling.", price: 60, imgSrc: "./images/dosa-2.jpg" },
  { name: "Chole Bhature", description: "Soft bread with spicy chole.", price: 60, imgSrc: "./images/cb.jpg" },
  { name: "Spring Roll", description: "Crunchy roll with noodles filling.", price: 20, imgSrc: "./images/spring.jpg" },
  { name: "Veg Burger", description: "Plant-based burger with fresh veggies.", price: 45, imgSrc: "./images/burger-1.jpg" },
  { name: "Paneer Burger", description: "Burger with paneer patty.", price: 60, imgSrc: "./images/burger-2.jpg" },
  { name: "Tomato Margherita Pizza", description: "Pizza with tangy tomato sauce.", price: 90, imgSrc: "./images/pizza-1.jpg" },
  { name: "Chowmein", description: "Stir-fried noodles with veggies.", price: 70, imgSrc: "./images/chowmein.jpg" },
  { name: "French fries", description: "Crispy salted fries.", price: 50, imgSrc: "./images/ff-1.jpg" },
  { name: "Veg Momos", description: "Thin and delicious soya filling.", price: 40, imgSrc: "./images/momo.jpg" },
  { name: "Mango Shake", description: "Thick mango shake.", price: 50, imgSrc: "./images/shake-1.jpg" },
  { name: "Choco Brownie Shake", description: "Brownie with chocolate shake.", price: 50, imgSrc: "./images/shake-2.jpg" },
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

  const handleOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/foodOrder", { cart });
      if (response.data === "Order placed")
            alert("Order Placed Successfully!");  
      setCart([]);
    } catch (error) {
      alert("Failed to place order.");
    }
  };

  return (
    <div>
      <Header />
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

export default FoodOrder;
