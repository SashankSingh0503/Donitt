import React, { useState } from "react";
import Header from "../Component/header";
import Footer from "../Component/footer";
// import axios from "axios"; 
import "./medicineOrder.css";
import { useNavigate } from "react-router-dom";


function GroceryOrder() {
   const navigate = useNavigate();  
    const [cart, setCart] = useState([]);
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(""); 
  

  const products = [
    { name: 'Toor dal', price: 150, imgSrc: './images/dal-1.jpg', description: 'Non polished organic toor dal' },
    { name: 'Chana dal', price: 100, imgSrc: './images/dal-2.jpg', description: 'Non polished organic chana dal' },
    { name: 'Chole', price: 100, imgSrc: './images/chole.jpg', description: 'Organic rich quality chole.' },
    { name: 'Atta', price: 350, imgSrc: './images/atta.jpg', description: 'Organic wheat chakki fresh atta.' },
    { name: 'Sugar', price: 45, imgSrc: './images/sugar.jpg', description: 'Simply sweet.' },
    { name: 'Salt', price: 25, imgSrc: './images/salt.jpg', description: 'Natural salt.' },
    { name: 'Blue lays', price: 20, imgSrc: './images/lays.jpg', description: 'Indian masala blue lays.' },
    { name: 'Uncle chips', price: 20, imgSrc: './images/uncle.jpg', description: 'Classic salted wafers.' },
    { name: 'Oreo biscuits', price: 20, imgSrc: './images/oreo.jpg', description: 'Vanilla filling inside chocolate wafers.' },
    { name: 'Veg Maggie', price: 10, imgSrc: './images/maggie.jpg', description: 'Tasty veg instant noodles.' },
    { name: 'Kitkat', price: 20, imgSrc: './images/kitkat.jpg', description: 'Chocolate wafers with chocolate coating.' },
    { name: 'Dairy-Milk', price: 20, imgSrc: "./images/dairymilk.jpg", description: 'Delicious chocolate and milk combination.' },
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

  const handleOrder = async () => {
    try {
      navigate("/order-summary", { state: { cart , type:"Grocery-Order"} }); 
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

export default GroceryOrder;
