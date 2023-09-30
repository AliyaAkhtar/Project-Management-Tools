const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Aliyaisagoodgirl';
const User = require('../models/User'); // Import your User model

const authenticateUser = async (req, res, next) => {
  try {
    // Check if there is an Authorization header with a JWT token
    const token = req.header('authtoken');
    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded User ID:', decoded.user.id);

    
    // Find the user by their ID (assuming you have a user ID in the token)
    const user = await User.findById(decoded.user.id);
    console.log('User:', user);


    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user object to the request for further use in the route handler
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authenticateUser;
