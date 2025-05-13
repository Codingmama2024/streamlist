// src/pages/SubscriptionPage.js
import React from 'react';
import list from '../data/Data';
import './SubscriptionPage.css';

const SubscriptionPage = ({ addToCart, subscriptionWarning }) => {
  const subscriptionItems = list.filter(item => item.id >= 1 && item.id <= 4); // Assuming IDs 1-4 are subscriptions

  return (
    <div className="subscription-page">
      <h2>Subscription Plans</h2>
      {subscriptionWarning && <div className="warning-label">{subscriptionWarning}</div>}
      <ul className="subscription-list">
        {subscriptionItems.map(item => (
          <li key={item.id} className="subscription-item">
            <div className="subscription-details">
              <h3>{item.service}</h3>
              <img src={item.img} alt={item.service} style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
              <p className="price">Price: ${item.price.toFixed(2)}/month</p>
              <p>{item.serviceInfo}</p>
            </div>
            <button onClick={() => addToCart(item)} className="subscription-button">
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionPage;