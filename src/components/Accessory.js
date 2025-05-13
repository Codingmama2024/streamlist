// src/components/Accessory.js
import { accessories } from "../data/Data";

const Accessory = ({ addToCart }) => {
  return (
    <div>
      <h2>Accessories</h2>
      {accessories.map((item) => (
        <div key={item.id}>
          <span>{item.name} - ${item.price}</span>
          <button onClick={() => addToCart({ ...item, type: "accessory" })}>
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default Accessory;
