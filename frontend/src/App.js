import React from 'react';
import './App.css';
import OrdersList from './components/OrdersList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Orders Management System</h1>
        <p>View and manage your orders</p>
      </header>
      <main className="App-main">
        <OrdersList />
      </main>
    </div>
  );
}

export default App;
