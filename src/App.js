import React from 'react';
import Wheel from './Wheel'; // Wheel bileşenini içe aktar

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Kittverse Spin the Wheel</h1>
      <Wheel />
    </div>
  );
}

export default App;
