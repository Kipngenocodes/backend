import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js'; // Importing Prisma client

const router = express.Router();
// Register a new user endpoint
router.post('/register', async (req, res) => {
    const {username, password} = req.body;

// Encrypt the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 8);
    // get the hashed password
    // console.log(hashedPassword);
    // console.log(username, password);

    // Insert the new user into the database
    try{
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            }
        });

        // create a default todo for the user
        const Default_todo = 'Hello :) this is your first todo!';
        await prisma.todo.create({
            data: {
                task: Default_todo,
                userId: user.id // Assuming the user model has an id field
            }
        });

        // create a JWT token for the user
        const token = jwt.sign({ id: result.user.id}, process.env.JWT_SECRET, {
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
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try{
        // Fetch the user from the database
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        // If user does not exist, send a 404 Not Found status
        if (!user) {
            return res.status(404).send({message : 'User not found'});

        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        // If the password is invalid, send a 401 Unauthorized status
        if (!isPasswordValid) {
            return res.status(401).send({message: 'Invalid password'});
        }
        // Output the user details for debugging
        console.log(user);
        // Then we have a successful login
        // Create a JWT token for the user
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        }); // expires in 24 hours
        // Send the token back to the client
        res.json({token});

    } catch (err) {
        console.log(err.message);
        // If there is an error, send a 503 Service Unavailable status
        res.sendStatus(503);
    }


    
})


export default router; 