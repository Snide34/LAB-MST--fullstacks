import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersList.css';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('http://localhost:5000/api/orders');
      
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'An error occurred while fetching orders. Please make sure the backend server is running.'
      );
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error-message">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Orders</h3>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No Orders Found</h3>
          <p>There are no orders to display at the moment.</p>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="orders-container">
      <div className="orders-summary">
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p className="summary-value">{orders.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p className="summary-value">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="orders-list">
        <h2>Order Details</h2>
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <span className="order-id">{order.orderId}</span>
                <span className="order-badge">Active</span>
              </div>
              <div className="order-body">
                <div className="order-detail">
                  <span className="detail-label">Total Amount</span>
                  <span className="detail-value">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleRetry} className="refresh-button">
        🔄 Refresh Orders
      </button>
    </div>
  );
};

export default OrdersList;
