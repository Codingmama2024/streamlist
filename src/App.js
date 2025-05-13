import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import TMDBPage from "./pages/TMDBPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import CartPage from "./pages/CartPage";
import AccessoryPage from "./pages/AccessoryPage"; // Ensure this import exists


function App() {
  const [streamList, setStreamList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });
  const [totalItems, setTotalItems] = useState(0); // State for totalItems
  const [subscriptionWarning, setSubscriptionWarning] = useState(null); // State for subscription warning

  // Update localStorage when cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Load streamList from localStorage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("streamList"));
    if (storedList) setStreamList(storedList);
  }, []);

  // Save streamList to localStorage
  useEffect(() => {
    localStorage.setItem("streamList", JSON.stringify(streamList));
  }, [streamList]);

  // Recalculate totalItems whenever cartItems changes
  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(newTotal);
  }, [cartItems]); // Dependency on cartItems

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setStreamList([...streamList, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue("");
  };

  const handleDelete = (id) => {
    setStreamList(streamList.filter((item) => item.id !== id));
  };

  const handleComplete = (id) => {
    setStreamList(
      streamList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleEdit = (id, newText) => {
    setStreamList(
      streamList.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  };

  const isSubscriptionId = (id) => {
    // Adjust this logic based on your actual subscription ID range
    return id >= 1 && id <= 4;
  };

  const addToCart = (item) => {
    if (isSubscriptionId(item.id)) {
      const hasSub = cartItems.some(i => isSubscriptionId(i.id));
      if (hasSub) {
        setSubscriptionWarning("Only one subscription allowed.");
        setTimeout(() => {
          setSubscriptionWarning(null);
        }, 3000); // Clear the warning after 3 seconds
        return;
      }
    }
    const exists = cartItems.find(i => i.id === item.id);
    if (exists) {
      setCartItems(prevCartItems =>
        prevCartItems.map(i => ({ ...i, quantity: i.quantity + 1 }))
      );
    } else {
      setCartItems(prevCartItems => [...prevCartItems, { ...item, quantity: 1 }]);
    }
    setSubscriptionWarning(null); // Clear warning on successful addition of non-subscription or first subscription
  };

  const removeFromCart = (id) => {
    setCartItems(prevCartItems => prevCartItems.filter(i => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCartItems(prevCartItems =>
      prevCartItems.map(i =>
        i.id === id ? { ...i, quantity: parseInt(qty, 10) } : i
      )
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <Router>
      <div className="App" style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <NavBar totalItems={totalItems} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="home">
                <h2 style={{ color: "#333", marginBottom: "20px" }}>My StreamList</h2>
                <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                  <input
                    type="text"
                    placeholder="Add a show or movie..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px", width: "300px", border: "1px solid #ccc", borderRadius: "4px" }}
                  />
                  <button type="submit" style={{ marginLeft: "10px", padding: "10px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Add</button>
                </form>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {streamList.map((item) => (
                    <li
                      key={item.id}
                      style={{
                        background: item.completed ? "#e6ffe6" : "#fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        marginBottom: "10px",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textDecoration: item.completed ? "line-through" : "none"
                      }}
                    >
                      <span style={{ flex: 1, fontWeight: 500 }}>{item.text}</span>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => handleComplete(item.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                          <FaCheck color={item.completed ? "green" : "gray"} size={18} title="Mark Complete" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                          <FaTrash color="red" size={18} title="Delete" />
                        </button>
                        <button
                          onClick={() => {
                            const newText = prompt("Edit item:", item.text);
                            if (newText !== null) handleEdit(item.id, newText);
                          }}
                          style={{ background: "none", border: "none", cursor: "pointer" }}
                        >
                          <FaEdit color="blue" size={18} title="Edit" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
          <Route path="/movies" element={<TMDBPage />} />
          <Route path="/subscriptions" element={<SubscriptionPage addToCart={addToCart} subscriptionWarning={subscriptionWarning} />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} totalPrice={totalPrice} />} />
          <Route path="/accessories" element={<AccessoryPage addToCart={addToCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;