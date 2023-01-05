const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');

//get auth user
router.get('/', auth, async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server Error');
  }
});

//login user
//
router.post('/', [
  check('email', 'Please provide a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if(!user || !(await bcrypt.compare(password, user.password))){
      return res.status(400).json({
        errors: [{ msg: 'Invalid email or password'}]
      });
    }

    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const payload = {
      user: {
        id: user._id
      }
    }
    //Return jsonwebtoken
    jwt.sign(payload, config.get('jwtSecret'),
        {expiresIn: 360000 },
        (err, token)=>{
          if(err) throw err;
          // user.password = undefined;
          res.json({ token });
        });

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
