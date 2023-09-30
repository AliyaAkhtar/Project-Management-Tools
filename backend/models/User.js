const mongoose = require('mongoose')
const {Schema} = mongoose
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
      },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format',
          },
      },
    password: {
        type: String,
        required: true,
      },
    role: {
        type: String,
        enum: ['Project Manager', 'Team Member'],
        // default: 'Team Member', // You can set a default role
      },
    phoneNumber: {
        type: String,
        validate: {
          validator: function (value) {
            return validator.isMobilePhone(value, 'any', { strictMode: false });
          },
          message: 'Invalid phone number format',
        },
      },
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    next();
  });

const User = mongoose.model('user', UserSchema);
module.exports = User;