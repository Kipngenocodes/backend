import express from 'express';
import db from '../db.js';

const router = express.Router(); 

// Get all todos for a user
router.get('/', (req, res) => {})

// Create a new todo for a user
router.post('/', (req, res) => {}) 

// Update a todo for a user
router.put('/:id', (req, res) => {})

// Delete a todo for a user
router.delete('/:id', (req, res) => {});