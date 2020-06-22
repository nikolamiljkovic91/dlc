const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

//@route    POST api/users
//@desc     Register user
//@access   Public access

router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

//@route    GET api/users
//@desc     Get all users
//@access   Private access

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });

    if (!users) {
      return res.status(400).json({ msg: 'No registered users' });
    }

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/users/:id
//@desc     Get user by id
//@access   Private access

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('profiles');
    console.log(user);

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/users
//@desc     Delete user
//@access   Private access

router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.user.id });

    if (!user) {
      res.status(400).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
