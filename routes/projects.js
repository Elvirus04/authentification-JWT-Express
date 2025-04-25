import express from 'express';
import { body } from 'express-validator';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import authenticateToken from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';

const router = express.Router();

// Protect all project routes
router.use(authenticateToken);

// Get all projects
router.get('/', getAllProjects);

// Get a single project
router.get('/:id', getProjectById);

// Create a new project
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional()
  ],
  validateRequest,
  createProject
);

// Update a project
router.put(
  '/:id',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional()
  ],
  validateRequest,
  updateProject
);

// Delete a project
router.delete('/:id', deleteProject);

export default router;