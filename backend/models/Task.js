const mongoose = require('mongoose')
const {Schema} = mongoose

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Remove leading/trailing whitespace
      },
    description: {
        type: String,
        trim: true,
      },
    dueDate: {
        type: Date,
        required: true,
      },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
      },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed'],
        default: 'To Do',
      },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
      },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project', // Reference to the Project model
      },
});
const Task = mongoose.model('task', TaskSchema);
module.exports = Task;