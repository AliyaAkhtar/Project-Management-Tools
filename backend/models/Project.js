const mongoose = require('mongoose')
const {Schema} = mongoose

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Remove leading/trailing whitespace
      },
    description: {
        type: String,
        trim: true,
      },
    startDate: {
        type: Date,
        required: true,
      },
    endDate: {
        type: Date,
        required: true,
      },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        // required: true,
      },
    teamMembers: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User', // Reference to the User model
        },
      ],
});

const Project = mongoose.model('project', ProjectSchema);
module.exports = Project;