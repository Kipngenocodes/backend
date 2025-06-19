
// The address of this server is: http://localhost:8383
// url: http://localhost:8383
// IP address: 127.0.0.1:8383
const express = require('express');
const app = express();
const PORT = 8383

// website endpoint: They are used to define the URL paths that the server will respond to html requests.
// HTTP VERBS && Routes (paths or endpoints)
app.get('/', (req, res) => {
  res.send("<h1>Welcome to the Home Page!</h1><input/>");
});

// Rouute to handle the dashboard
app.get('/dashboard', (req, res) => {
  console.log('Dashboard accessed');
  res.send('Welcome to the Dashboard!');
});
// API endpoint: They are used to define the URL paths that the server will respond to JSON requests.
// non-visual aspect of the code

// CRUD Create -post, Read-get, Update - post, Delete -delete

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});