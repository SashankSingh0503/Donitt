import React from "react";
import "./orderplaced.css";


function Placed() {
  return (
    <div class="body">
      <div className="container">
        <div className="company-name">Donitt</div>
        <div className="message" id="h1">Thank you for shopping with us!</div>
        <div className="animation">
          <div className="checkmark">&#10004;</div>
        </div>
        <div className="order-id">Order will be delivered soon.</div>
      </div>
    </div>
  );
}

export default Placed;
