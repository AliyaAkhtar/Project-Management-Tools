const mongoose = require('mongoose')
const {Schema} = mongoose

const NotificationSchema = new Schema({
    message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['Task Assignment', 'Deadline', 'Other'], // Add more notification types as needed
        required: true,
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      isRead: {
        type: Boolean,
        default: false, // Initially, the notification is unread
      },
    }, {
      timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Notification = mongoose.model('notification', NotificationSchema);
module.exports = Notification;