// src/pages/CartPage.js
import React from 'react';
import './CartPage.css'; // Make sure you have this CSS

const CartPage = ({ cartItems, removeFromCart, updateQuantity, totalPrice }) => {
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <div className="item-name">{item.service}</div> {/* Display the item name here */}
              <div className="quantity-controls">
                <label htmlFor={`qty-${item.id}`}>Qty:</label>
                <input
                  type="number"
                  id={`qty-${item.id}`}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                />
              </div>
              <div className="price">${(item.price * item.quantity).toFixed(2)}</div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
          <div className="cart-total">
            <strong>Total:</strong> <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>
        </ul>
      )}
    </div>
  );
};

export default CartPage;