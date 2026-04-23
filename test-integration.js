// Integration test script to verify the API and frontend setup
const http = require('http');

console.log('🧪 Testing Orders Management System Integration\n');

// Test 1: Backend API Health Check
function testHealthEndpoint() {
  return new Promise((resolve, reject) => {
    console.log('Test 1: Checking backend health endpoint...');
    http.get('http://localhost:5000/api/health', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.status === 'OK') {
            console.log('✅ Backend health check passed');
            console.log(`   Response: ${JSON.stringify(response)}\n`);
            resolve();
          } else {
            reject('Health check failed');
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

// Test 2: Orders API Endpoint
function testOrdersEndpoint() {
  return new Promise((resolve, reject) => {
    console.log('Test 2: Fetching orders from API...');
    http.get('http://localhost:5000/api/orders', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.success && Array.isArray(response.data)) {
            console.log('✅ Orders API endpoint working correctly');
            console.log(`   Found ${response.data.length} orders`);
            console.log(`   Sample order: ${JSON.stringify(response.data[0])}\n`);
            
            // Validate order structure
            const firstOrder = response.data[0];
            if (firstOrder.orderId && typeof firstOrder.totalAmount === 'number') {
              console.log('✅ Order data structure is valid\n');
              resolve(response.data);
            } else {
              reject('Invalid order structure');
            }
          } else {
            reject('Invalid API response');
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

// Test 3: Frontend Server
function testFrontendServer() {
  return new Promise((resolve, reject) => {
    console.log('Test 3: Checking frontend server...');
    http.get('http://localhost:3000', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Frontend server is running on http://localhost:3000\n');
        resolve();
      } else {
        reject(`Frontend returned status code: ${res.statusCode}`);
      }
    }).on('error', reject);
  });
}

// Run all tests
async function runTests() {
  try {
    await testHealthEndpoint();
    const orders = await testOrdersEndpoint();
    await testFrontendServer();
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('🎉 All tests passed successfully!');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n📊 Summary:');
    console.log(`   • Backend API: http://localhost:5000`);
    console.log(`   • Frontend App: http://localhost:3000`);
    console.log(`   • Total Orders: ${orders.length}`);
    console.log(`   • Total Revenue: $${orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}`);
    console.log('\n✨ Open http://localhost:3000 in your browser to see the app!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    console.log('\n💡 Make sure both servers are running:');
    console.log('   1. Backend: cd backend && npm start');
    console.log('   2. Frontend: cd frontend && npm start');
    process.exit(1);
  }
}

runTests();
