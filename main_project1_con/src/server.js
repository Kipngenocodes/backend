import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
import todoAppRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';




const app = express();
const PORT = process.env.PORT || 5003;

// Get the file path of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current module
const __dirname = dirname(__filename);

// middleware to parse JSON bodies
app.use(express.json());

// Serving up the html file from the public directory and also tell express to serve static files
app.use(express.static(path.join(__dirname, '../public')));


// Serving up the html file from the public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes 
app.use ('/auth', authRoutes);
// app.use('/users', userRoutes);
app.use('/todos', authMiddleware, todoAppRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});