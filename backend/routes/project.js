const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
// const authenticateUser = require('../middleware/authenticateUser');
// const authorizeUser = require('../middleware/authorizeUser');
const Project = require('../models/Project');

// Create a new project   //fetchUser,
router.post('/', fetchUser, (req, res) => {
  try {
    // Get project details from the request body
    const { name, description, startDate, endDate } = req.body;

    // Convert date strings to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // // Get the authenticated user's ID from the request
    const projectManager = req.user._id; // Assuming you have set the user ID in req.user during authentication

    // Create a new project instance
    const project = new Project({
      name,
      description,
      startDate: startDateObj, // Use the Date objects
      endDate: endDateObj,     // Use the Date objects
      // postedBy: projectManager // Assuming the current user is the project manager
    });

    // Save the project to the database
    project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update project details  //authorizeUser('Project Manager'),
router.put('/:projectId', fetchUser, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project details
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.startDate = req.body.startDate || project.startDate;
    project.endDate = req.body.endDate || project.endDate;

    // Save the updated project
    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a project  //authorizeUser('Project Manager'),
router.delete('/:projectId', fetchUser, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if the project exists
    const project = await Project.findById(projectId);
    console.log('Project:', project); // Log the project object

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Remove the project from the database
   await Project.deleteOne({ _id: project._id });


    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// List all projects     
router.get('/', fetchUser, async (req, res) => {
  try {
    // Fetch all projects
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// View project details
router.get('/:projectId', fetchUser, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Fetch the project by its ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
