import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    console.log('User added:', input);
    setInput('');
  };

  return (
    <div>
      <h1>Your StreamList</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter movie or show name"
      />
      <button onClick={handleAdd}>Add to List</button>
    </div>
  );
};

export default Home;