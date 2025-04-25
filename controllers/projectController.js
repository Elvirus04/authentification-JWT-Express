import pool from '../config/db.js';

/**
 * Get all projects for the authenticated user
 */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: projects.rows.length,
      data: projects.rows
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

/**
 * Get a single project by ID
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await pool.query(
      'SELECT * FROM projects WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (project.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project.rows[0]
    });
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

/**
 * Create a new project
 */
export const createProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newProject = await pool.query(
      'INSERT INTO projects (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, req.user.id]
    );

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject.rows[0]
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

/**
 * Update a project
 */
export const updateProject = async (req, res) => {
  const { title, description } = req.body;
  
  try {
    // Check if project exists and belongs to user
    const project = await pool.query(
      'SELECT * FROM projects WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (project.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or unauthorized'
      });
    }

    // Update project
    const updatedProject = await pool.query(
      'UPDATE projects SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, description, req.params.id, req.user.id]
    );

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject.rows[0]
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

/**
 * Delete a project
 */
export const deleteProject = async (req, res) => {
  try {
    // Check if project exists and belongs to user
    const project = await pool.query(
      'SELECT * FROM projects WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (project.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or unauthorized'
      });
    }

    // Delete project
    await pool.query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};