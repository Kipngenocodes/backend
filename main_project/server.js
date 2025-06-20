
// The address of this server is: http://localhost:8383
// url: http://localhost:8383
// IP address: 127.0.0.1:8383
const express = require('express');
const app = express();
const PORT = 8383

// Middleware to parse JSON bodies
app.use(express.json());

data = { 
  name: "John Doe",
  age: 30,
  occupation: "Software Engineer"
};

// website endpoint: They are used to define the URL paths that the server will respond to html requests.
// HTTP VERBS && Routes (paths or endpoints)
app.get('/', (req, res) => {
  res.send(
  `
  <h1>Welcome to My Website</h1>
  <p>This is a simple server using Express.js</p>
  <p>Click <a href="/dashboard">here</a> to go to the dashboard.</p>
  <p>Click <a href="/api/data">here</a> to see the API data.</p>
  <p>Click <a href="/json">here</a> to see the JSON data.</p>
  
  <body>
  <p>${JSON.stringify(data)}</p>
  </body>
  `
  )
});

// Route to handle the dashboard
app.get('/dashboard', (req, res) => {
  res.send("<h1> Welcome to the Dashboard!</h1>");
});
// API endpoint: They are used to define the URL paths that the server will respond to JSON requests.
// non-visual aspect of the code
app.get('/api/data', (req, res) => {
  console.log("API endpoint hit");
  // Simulating API data
  res.send(data);
});
// CRUD Create -post, Read-get, Update - post, Delete -delete 
app.post('/api/data', (req, res) => { 
  // someone wants to create a user in  server
  const new_data = req.body;
  console.log("Data created:", new_data);
  res.sendStatus(201); // Created
  
});
app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});