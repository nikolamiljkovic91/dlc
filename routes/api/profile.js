const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route    GET api/profile
//@desc     Get current user profiles
//@access   Private access

router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.user.id }).sort({
      date: -1,
    });

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/profile
//@desc     Create a profile
//@access   Private access

router.post(
  '/',
  auth,
  [check('dogName', 'Dog name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newProfile = new Profile({
        user: req.user.id,
        profilePic: req.body.profilePic,
        dogName: req.body.dogName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        about: req.body.about,
      });

      const profile = await newProfile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    PUT api/profile/:id
//@desc     Update profile
//@access   Private access

router.put(
  '/:id',
  auth,
  [check('dogName', 'Dog name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedProfile = {
      user: req.user.id,
      profilePic: req.body.profilePic,
      dogName: req.body.dogName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      about: req.body.about,
    };

    try {
      const profile = await Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedProfile },
        { new: true, upsert: true }
      );

      const updated = await profile.save();

      res.json(updated);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/profile/:id
//@desc     Get profile by id
//@access   Private access

router.get('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    if (err.kind === 'ObjectId' || err.kind === undefined) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route    DELETE api/profile/:id
//@desc     Delete profile
//@access   Private access

router.delete('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await profile.remove();

    res.json({ msg: 'Profile removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId' || err.kind === undefined) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
