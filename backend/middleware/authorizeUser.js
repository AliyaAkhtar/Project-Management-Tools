const User = require('../models/User');

const authorizeUser = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Ensure that the user is authenticated and user data is attached to req.user
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      // Fetch the user's role from the database or user data
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Check if the user's role matches the required role
      if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // User is authorized; proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
};

module.exports = authorizeUser;
