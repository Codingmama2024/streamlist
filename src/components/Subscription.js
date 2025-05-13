// src/components/Subscription.js
import { subscriptions } from "../data/Data";

const Subscription = ({ addToCart, warning }) => {
  return (
    <div>
      <h2>Subscriptions</h2>
      {warning && <p style={{ color: "red" }}>Only one subscription allowed!</p>}
      {subscriptions.map((item) => (
        <div key={item.id}>
          <span>{item.name} - ${item.price}</span>
          <button onClick={() => addToCart({ ...item, type: "subscription" })}>
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default Subscription;
