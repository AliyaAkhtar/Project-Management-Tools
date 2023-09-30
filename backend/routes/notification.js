const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notification = require('../models/Notification');

// Create a new notification
router.post('/', fetchUser, async (req, res) => {
  try {
    // Get notification details from the request body
    const { message, type, sender, receiver } = req.body;

    // Create a new notification instance
    const notification = new Notification({
      message,
      type,
      sender,
      receiver,
      isRead: false, // Initially unread
    });

    // Save the notification to the database
    await notification.save();

    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Mark a notification as read
router.put('/:notificationId', fetchUser, async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Check if the notification exists
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Mark the notification as read
    notification.isRead = true;

    // Save the updated notification
    await notification.save();

    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// List notifications for a user
router.get('/user/:userId', fetchUser, async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all notifications for the specified user
    const notifications = await Notification.find({ receiver: userId });

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// View notification details
router.get('/:notificationId', fetchUser, async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Fetch the notification by its ID
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a notification
router.delete('/:notificationId', fetchUser, async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Check if the notification exists
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Remove the notification from the database
    await notification.remove();

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
