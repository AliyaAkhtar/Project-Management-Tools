const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Aliyaisagoodgirl';

const fetchUser = require('../middleware/fetchUser');

router.post('/register', [
  body('username','Enter valid name').isLength({min:3}),
  body('email', 'enter valid email').isEmail(),
  body('password','Password must be atleast 5 characters').isLength({min:5}),
], async (req,res) => {
  let success = false;

  // if there are errors return bad request
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({success, errors:errors.array()});
  }

  // check whether same email exist
  try{
    let user = await User.findOne({email: req.body.email});

    if(user){
      success = false
      return res.status(400).json({success, error: "Email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // create new user
    user = await User.create({
      username:req.body.username,
      password:secPass,
      email:req.body.email,
    })

    const data = {
      user:{
        id:user._id
      }
    }
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;

    res.json({success, authtoken})
  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
})

// // ROUTE2: Authenticate a user using POST "/api/user/login" (No login required)
router.post('/login',[
  body('email','Enter valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
],async(req,res) => {
  success = false
  //check for validation errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const {email, password} = req.body;
  try{
    let user = await User.findOne({email});
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!user && !passwordCompare){
      success = false
      //return a more accurate message
      return res.status(400).json({error: 'User not found or this email already exists'});
    }
     // Now that the user is authenticated, you can get their role
     const userRole = user.role;

     // Determine the redirect URL based on the user's role
     let redirectUrl = '';
 
     if (userRole === 'projectManager') {
       redirectUrl = '/projectdashboard';
     } else if (userRole === 'Team Member') {
       redirectUrl = '/task';
     }
    const data = {
      user: {
        id: user._id,
      },
      redirectUrl, // Set the redirectUrl property here
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true
    res.json({ success, authtoken, redirectUrl }); 
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
}
);

// ROUTE3: Get logged-in user details using POST "/api/user/profile" (Login required)
router.post('/profile', fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('username email -_id'); // Exclude _id
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
