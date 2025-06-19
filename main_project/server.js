
// The address of this server is: http://localhost:8383
// url: http://localhost:8383
// IP address: 127.0.0.1:8383
const express = require('express');
const app = express();
const PORT = 8383
// HTTP VERBS && Routes (paths or endpoints)
app.get('/', (req, res) => {
  console.log('Hello, There has been change in the server.js file since the last commit.', req.method);
    res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});