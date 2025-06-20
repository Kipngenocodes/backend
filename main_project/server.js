
// The address of this server is: http://localhost:8383
// url: http://localhost:8383
// IP address: 127.0.0.1:8383
const express = require('express');
const app = express();
const PORT = 8383

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
  <body>
  <p>${JSON.stringify(data)}</p>
  </body>
  `
  )
});

// Rouute to handle the dashboard
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

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});