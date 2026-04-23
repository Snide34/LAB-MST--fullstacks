const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample orders data
const orders = [
  { orderId: 'ORD-001', totalAmount: 299.99 },
  { orderId: 'ORD-002', totalAmount: 149.50 },
  { orderId: 'ORD-003', totalAmount: 599.00 },
  { orderId: 'ORD-004', totalAmount: 89.99 },
  { orderId: 'ORD-005', totalAmount: 1299.99 }
];

// API endpoint to get all orders
app.get('/api/orders', (req, res) => {
  // Simulate a slight delay to show loading state
  setTimeout(() => {
    res.json({
      success: true,
      data: orders
    });
  }, 500);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Orders API available at http://localhost:${PORT}/api/orders`);
});
