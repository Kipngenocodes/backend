import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js ';


const router = express.Router();
// Register a new user endpoint
router.post('/register',(req, res) => {
    const {username, password} = req.body;

// Encrypt the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 8);
    // get the hashed password
    // console.log(hashedPassword);
    // console.log(username, password);

    // Insert the new user into the database
    try{
        const insert_user = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        const result = insert_user.run(username, hashedPassword);

        // create a default todo for the user
        const Default_todo = 'Hello :) this is your first todo!';
        const insert_todo = db.prepare("INSERT INTO todos (user_id, task) VALUES (?, ?)");

        // Insert the default todo for the user
        insert_todo.run(result.lastInsertRowid, Default_todo);
        
        // create a JWT token for the user
        const token = jwt.sign({ id: result.lastInsertRowid}, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        }); // expires in 24 hours

        // Send the token back to the client
        res.json({token})

    } catch (err) {
        console.log(err.message);
        // If there is an error, send a 503 Service Unavailable status
        res.sendStatus(503);
    }


})
// Login endpoint for existing users
// This endpoint will authenticate the user and return a JWT token
router.post('/login', (req, res) => {
    const {username, password} = req.body;

    try{
        // Fetch the user from the database
        const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
        const user = getUser.get(username);

        // If user does not exist, send a 404 Not Found status
        if (!user) {
            return res.status(404).send({message : 'User not found'});
        }

    } catch (err) {
        console.log(err.message);
        // If there is an error, send a 503 Service Unavailable status
        res.sendStatus(503);
    }
})


export default router; 