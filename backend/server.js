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

// POST - Add new order
app.post('/api/orders', (req, res) => {
  const { orderId, totalAmount } = req.body;
  
  // Validation
  if (!orderId || !totalAmount) {
    return res.status(400).json({
      success: false,
      message: 'orderId and totalAmount are required'
    });
  }
  
  // Check if order already exists
  const exists = orders.find(o => o.orderId === orderId);
  if (exists) {
    return res.status(400).json({
      success: false,
      message: 'Order ID already exists'
    });
  }
  
  // Add new order
  const newOrder = { orderId, totalAmount: parseFloat(totalAmount) };
  orders.push(newOrder);
  
  res.status(201).json({
    success: true,
    message: 'Order added successfully',
    data: newOrder
  });
});

// PUT - Update existing order
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { totalAmount } = req.body;
  
  const index = orders.findIndex(o => o.orderId === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Update order
  orders[index].totalAmount = parseFloat(totalAmount);
  
  res.json({
    success: true,
    message: 'Order updated successfully',
    data: orders[index]
  });
});

// DELETE - Remove order
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  
  const index = orders.findIndex(o => o.orderId === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Remove order
  const deletedOrder = orders.splice(index, 1)[0];
  
  res.json({
    success: true,
    message: 'Order deleted successfully',
    data: deletedOrder
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Orders API available at http://localhost:${PORT}/api/orders`);
});
