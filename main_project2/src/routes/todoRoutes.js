import express from 'express';
import prisma from '../prismaClient.js'; // Importing Prisma client

const router = express.Router(); 

// Get all todos for a user
router.get('/', async(req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.user.id // Assuming req.user is populated with the authenticated user's info
        }
    });
    res.json(todos);
})

// Create a new todo for a user
router.post('/', async(req, res) => {

    const { task } = req.body;
    const todo = await prisma.todo.create({
        data: {
            task: task,
            userId: req.user.id // Assuming req.user is populated with the authenticated user's info
        }
    });
    res.json(todo);
})

// Update a todo for a user
router.put('/:id', async(req, res) => {
    const  {completed } = req.body;
    const { id} = req.params;
    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id), // Convert id to integer
            userId: req.user.id // Assuming req.user is populated with the authenticated user's info
        },
        data: {
            completed: !!completed
        }
    });
    res.json(updatedTodo);


})

// Delete a todo for a user
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const userID = req.user.id;
    await prisma.todo.delete({
        where: {
            id: parseInt(id), // Convert id to integer
            userId// Assuming req.user is populated with the authenticated user's info
        }
    });
    res.json({message: "Todo deleted successfully"});
});


export default router;