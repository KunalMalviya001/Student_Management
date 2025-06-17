import express from 'express';
import { addSchool, listSchools } from '../controllers/schoolController.js';

const router = express.Router();

// Route to handle adding a new school via POST request
router.post('/addSchool', addSchool);

// Route to handle listing schools sorted by distance via GET request
router.get('/listSchools', listSchools);

export default router; // Export the router for use in your main app
