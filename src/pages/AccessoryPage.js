import React from 'react';
import list from '../data/Data';
import './AccessoryPage.css'; // Make sure you have this CSS file

const AccessoryPage = ({ addToCart }) => {
  const accessoryItems = list.filter(item => item.id >= 5 && item.id <= 8);

  return (
    <div className="accessory-page">
      <h2>Accessories</h2>
      <ul className="accessory-list">
        {accessoryItems.map(item => (
          <li key={item.id} className="accessory-item">
            <div className="accessory-details">
              <h3>{item.service}</h3>
              <img src={item.img} alt={item.service} style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
              <p className="price">Price: ${item.price.toFixed(2)}</p>
              <p>{item.serviceInfo}</p>
            </div>
            <button onClick={() => addToCart(item)} className="accessory-button">
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessoryPage;