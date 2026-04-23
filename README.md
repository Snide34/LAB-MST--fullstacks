# Orders Management System

A full-stack application with Express.js backend API and React frontend for managing and displaying orders.

## Project Structure

```
.
├── backend/
│   ├── server.js          # Express API server
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── OrdersList.js    # Orders component
│   │   │   └── OrdersList.css   # Component styles
│   │   ├── App.js         # Main App component
│   │   ├── App.css        # App styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
└── README.md
```

## Features

- ✅ Express.js REST API with CORS enabled
- ✅ React frontend with Axios for API calls
- ✅ Loading state with spinner animation
- ✅ Error handling with retry functionality
- ✅ Empty state handling
- ✅ Responsive design
- ✅ Order summary statistics
- ✅ Beautiful gradient UI

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   The API will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

   The app will open in your browser at `http://localhost:3000`

## API Endpoints

### GET /api/orders
Returns a list of all orders.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "orderId": "ORD-001",
      "totalAmount": 299.99
    }
  ]
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Testing the Application

1. **Start the backend server** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   You should see: "Server is running on http://localhost:5000"

2. **Start the frontend app** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```
   The browser will open automatically at http://localhost:3000

3. **Verify the functionality:**
   - The app should display a loading spinner initially
   - After loading, you should see 5 orders displayed in cards
   - The summary shows total orders (5) and total revenue ($2,438.47)
   - Click "Refresh Orders" to reload the data
   - Stop the backend server to test error handling
   - Click "Try Again" to test the retry functionality

## Error Handling

The application handles three states:

1. **Loading State**: Shows a spinner while fetching data
2. **Error State**: Displays error message with retry button if the API fails
3. **Empty State**: Shows a message if no orders are found

## Technologies Used

### Backend
- Express.js - Web framework
- CORS - Cross-origin resource sharing
- Node.js - Runtime environment

### Frontend
- React - UI library
- Axios - HTTP client
- CSS3 - Styling with animations

## Troubleshooting

**Issue**: Frontend can't connect to backend
- **Solution**: Make sure the backend server is running on port 5000
- Check that CORS is enabled in the backend

**Issue**: Port already in use
- **Solution**: Kill the process using the port or change the port number in the code

**Issue**: npm install fails
- **Solution**: Make sure you have Node.js and npm installed
- Try deleting node_modules and package-lock.json, then run npm install again
