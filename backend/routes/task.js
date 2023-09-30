const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Task = require('../models/Task');

// Create a new task within a project  //fetchUser, 
router.post('/', async (req, res) => {
  try {
    // Get task details from the request body    ///, projectId
    const { name, description, dueDate } = req.body;

    // Create a new task instance
    const task = new Task({
      name,
      description,
      dueDate,
      // projectId,
      assignee: null, // Initially unassigned
      status: 'To Do', // Default status
    });

    // Save the task to the database
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update task details
router.put('/:taskId', fetchUser, async (req, res) => {
  try {
    const { taskId } = req.params;

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task details
    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.assignee = req.body.assignee || task.assignee; // Assuming the assignee is an ID
    task.status = req.body.status || task.status;

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a task
router.delete('/:taskId', fetchUser, async (req, res) => {
  try {
    const { taskId } = req.params;

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task from the database
    await task.remove();

    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// List tasks within a project
router.get('/project/:projectId', fetchUser, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Fetch all tasks within the specified project
    const tasks = await Task.find({ projectId });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// View all tasks
router.get('/', fetchUser, async (req, res) => {
  try {
    // Fetch all tasks
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// View task details
router.get('/:taskId', fetchUser, async (req, res) => {
  try {
    const { taskId } = req.params;

    // Fetch the task by its ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update task status
router.put('/:taskId/status', fetchUser, async (req, res) => {
  try {
    const { taskId } = req.params;

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task status
    task.status = req.body.status || task.status;

    // Save the updated task status
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Assign a task to a user
router.put('/:taskId/assign', fetchUser, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { assignee } = req.body;

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task's assignee
    task.assignee = assignee;

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
