import express from 'express';
import db from '../db.js';

const router = express.Router(); 

// Get all todos for a user
router.get('/', (req, res) => {
    const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
    const todos = getTodos.all(req.user.id);
    res.json(todos);
})

// Create a new todo for a user
router.post('/', (req, res) => {
    const { task } = req.body;
    const insertTodo = db.prepare("INSERT INTO todos (user_id, task) VALUES (?, ?)");

    const result = insertTodo.run(req.user.id, task);

    res.json({id: result.lastInsertRowid, task, completed:0});
}) 

// Update a todo for a user
router.put('/:id', (req, res) => {
    const  {completed } = req.body;
    const { id} = req.params;
    const {page} = req.query;
    const updateTodo = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
    updateTodo.run( completed, id);
    res.json({message: "Todo updated successfully"});


})

// Delete a todo for a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;
    const deleteTodo = db.prepare("DELETE FROM todos WHERE id = ? and user_id = ?");
    deleteTodo.run(id, userID);
    res.json({message: "Todo deleted successfully"});
});


export default router;