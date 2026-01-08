import express from 'express';
import ExampleController from '../controllers/exampleController.js';

const router = express.Router();
const exampleController = new ExampleController();

// Define your routes here
router.get('/users', exampleController.getAllUsers);
router.post('/users', exampleController.createUser);

export default router;