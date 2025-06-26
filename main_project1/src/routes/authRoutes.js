import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js ';


const router = express.Router();
// Register a new user endpoint
router.post('/register',(req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    res.sendStatus(201)
})
// Login endpoint for existing users
// This endpoint will authenticate the user and return a JWT token
router.post('/login', (req, res) => {})

export default router; 