# Testing Guide

## Automated Testing

Run the integration test script to verify both servers are working:

```bash
node test-integration.js
```

This will test:
- ✅ Backend health endpoint
- ✅ Orders API endpoint
- ✅ Frontend server availability
- ✅ Data structure validation

## Manual Testing Checklist

### 1. Backend API Testing

**Test the health endpoint:**
```bash
curl http://localhost:5000/api/health
```
Expected response:
```json
{"status":"OK","message":"Server is running"}
```

**Test the orders endpoint:**
```bash
curl http://localhost:5000/api/orders
```
Expected response:
```json
{
  "success": true,
  "data": [
    {"orderId": "ORD-001", "totalAmount": 299.99},
    {"orderId": "ORD-002", "totalAmount": 149.5},
    {"orderId": "ORD-003", "totalAmount": 599},
    {"orderId": "ORD-004", "totalAmount": 89.99},
    {"orderId": "ORD-005", "totalAmount": 1299.99}
  ]
}
```

### 2. Frontend Testing

Open your browser and navigate to: **http://localhost:3000**

#### Test Cases:

**✅ Test 1: Initial Load**
- [ ] Page loads without errors
- [ ] Loading spinner appears briefly
- [ ] Orders are displayed after loading

**✅ Test 2: Data Display**
- [ ] Summary cards show "Total Orders: 5"
- [ ] Summary cards show "Total Revenue: $2438.47"
- [ ] All 5 orders are displayed in cards
- [ ] Each order shows Order ID (e.g., "ORD-001")
- [ ] Each order shows Total Amount (e.g., "$299.99")
- [ ] Each order has an "Active" badge

**✅ Test 3: Refresh Functionality**
- [ ] Click the "🔄 Refresh Orders" button
- [ ] Loading spinner appears
- [ ] Orders reload successfully

**✅ Test 4: Error Handling**
1. Stop the backend server (Ctrl+C in backend terminal)
2. Click "🔄 Refresh Orders" button
3. Verify:
   - [ ] Error message appears
   - [ ] Error icon (⚠️) is displayed
   - [ ] "Try Again" button is visible
4. Restart the backend server
5. Click "Try Again" button
6. Verify:
   - [ ] Orders load successfully

**✅ Test 5: Responsive Design**
- [ ] Resize browser window to mobile size (< 768px)
- [ ] Verify layout adapts properly
- [ ] Cards stack vertically on small screens

**✅ Test 6: Browser Console**
- [ ] Open browser DevTools (F12)
- [ ] Check Console tab for errors (should be none)
- [ ] Check Network tab:
  - [ ] GET request to http://localhost:5000/api/orders
  - [ ] Status: 200 OK
  - [ ] Response contains order data

### 3. Cross-Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)

### 4. Performance Testing

**Check loading time:**
- [ ] Initial page load < 2 seconds
- [ ] API response time < 1 second
- [ ] Smooth animations (no lag)

### 5. Code Quality Checks

**Backend:**
```bash
cd backend
node server.js
# Should start without errors
```

**Frontend:**
```bash
cd frontend
npm start
# Should compile without errors
```

## Expected Results Summary

### Backend (Port 5000)
- ✅ Server starts successfully
- ✅ CORS enabled for cross-origin requests
- ✅ Returns 5 sample orders
- ✅ Health check endpoint responds

### Frontend (Port 3000)
- ✅ React app compiles successfully
- ✅ Axios fetches data from backend
- ✅ Loading state displays during fetch
- ✅ Error state handles API failures
- ✅ Orders display in responsive grid
- ✅ Summary statistics calculate correctly
- ✅ Refresh button reloads data

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process if needed
taskkill /PID <PID> /F
```

### Frontend won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID <PID> /F
```

### CORS errors
- Verify backend has `cors` package installed
- Check that backend is running before frontend
- Verify API URL in frontend is correct: `http://localhost:5000`

### Data not loading
1. Check backend is running: http://localhost:5000/api/health
2. Check browser console for errors
3. Verify network request in DevTools
4. Check CORS headers in response

## Success Criteria

All tests pass when:
- ✅ Backend API returns correct data
- ✅ Frontend displays all 5 orders
- ✅ Loading state works properly
- ✅ Error handling works when backend is down
- ✅ Refresh functionality works
- ✅ No console errors
- ✅ Responsive design works on mobile
- ✅ Integration test script passes
