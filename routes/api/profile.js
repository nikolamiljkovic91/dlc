const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

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
    // console.log(req.files);
    try {
      // if (!req.files) {
      //   return res.status(400).json({ msg: 'Please upload a file' });
      // }
      let file;

      if (req.files) {
        file = req.files.file;
        // Make sure that image is a photo
        if (!file.mimetype.startsWith('image')) {
          return res.status(400).json({ msg: 'Please upload a image file' });
        }

        const maxFileSize = 1000000;

        // Check file size
        if (file.size > maxFileSize) {
          return res
            .status(400)
            .json({ msg: 'Please upload a file less than 1MB' });
        }

        // Create custom file name
        file.name = `photo_${req.user.id}${Date.now()}${
          path.parse(file.name).ext
        }`;

        file.mv(`./client/public/uploads/${file.name}`, async (err) => {
          return {
            if(err) {
              console.error(err);
              return res.status(500).json({ msg: 'Problem with file upload' });
            },
          };
        });
      }

      const newProfile = new Profile({
        user: req.user.id,
        dogName: req.body.dogName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        about: req.body.about,
      });

      if (file) {
        newProfile.profilePic = `/uploads/${file.name}`;
      }

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

    console.log(req.body);

    try {
      // if (!req.files) {
      //   return res.status(400).json({ msg: 'Please upload a file' });
      // }

      let file;

      if (req.files) {
        file = req.files.file;

        // Make sure that image is a photo
        if (!file.mimetype.startsWith('image')) {
          return res.status(400).json({ msg: 'Please upload a image file' });
        }

        const maxFileSize = 1000000;

        // Check file size
        if (file.size > maxFileSize) {
          return res
            .status(400)
            .json({ msg: 'Please upload a file less than 1MB' });
        }

        // Create custom file name
        file.name = `photo_${req.user.id}${Date.now()}${
          path.parse(file.name).ext
        }`;

        file.mv(`./client/public/uploads/${file.name}`, async (err) => {
          return {
            if(err) {
              console.error(err);
              return res.status(500).json({ msg: 'Problem with file upload' });
            },
          };
        });
      }

      let profile = await Profile.findById(req.params.id);
      if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' });
      }

      // Make sure user is course owner
      if (profile.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      // Delete picture from /uploads folder
      if (req.files) {
        fs.unlink(`client/public/${profile.profilePic}`, (err) => {
          if (err) console.error(err);
          console.log(`${profile.profilePic} was deleted`);
        });
      }

      profile = await Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );

      if (file) {
        profile.profilePic = `/uploads/${file.name}`;
      }

      await profile.save();

      res.json(profile);
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
    console.error(err.message);
    if (err.name === 'CastError') {
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
    if (err.name === 'CastError') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/profile/:id/photo
//@desc     Upload photo
//@access   Private access

router.put('/:id/photo', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    if (!req.files) {
      return res.status(400).json({ msg: 'Please upload a file' });
    }

    const file = req.files.file;

    // Make sure that image is a photo
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({ msg: 'Please upload a image file' });
    }

    const maxFileSize = 1000000;

    // Check file size
    if (file.size > maxFileSize) {
      return res
        .status(400)
        .json({ msg: 'Please upload a file less than 1MB' });
    }

    // Create custom file name
    file.name = `photo_${profile.id}${Date.now()}${path.parse(file.name).ext}`;

    file.mv(`./client/public/uploads/${file.name}`, async (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Problem with file upload' });
      }

      const photo = {
        path: `/uploads/${file.name}`,
        user: req.user.id,
      };

      profile.photos.unshift(photo);

      await profile.save();

      res.json(profile);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// //@route    PUT api/profile/:id/profilePic
// //@desc     Upload profile picture
// //@access   Private access

// router.put('/:id/profilePic', auth, async (req, res) => {
//   try {
//     const profile = await Profile.findById(req.params.id);

//     if (!profile) {
//       return res.status(400).json({ msg: 'Profile not found' });
//     }

//     if (!req.files) {
//       return res.status(400).json({ msg: 'Please upload a file' });
//     }

//     const file = req.files.file;

//     // Make sure that image is a photo
//     if (!file.mimetype.startsWith('image')) {
//       return res.status(400).json({ msg: 'Please upload a image file' });
//     }

//     const maxFileSize = 1000000;

//     // Check file size
//     if (file.size > maxFileSize) {
//       return res
//         .status(400)
//         .json({ msg: 'Please upload a file less than 1MB' });
//     }

//     // Create custom file name
//     file.name = `photo_${profile.id}${Date.now()}${path.parse(file.name).ext}`;

//     file.mv(`./public/uploads/${file.name}`, async (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ msg: 'Problem with file upload' });
//       }

//       const updated = await Profile.findByIdAndUpdate(
//         req.params.id,
//         {
//           profilePic: file.name,
//         },
//         { new: true }
//       );

//       res.json(updated);
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

//@route    DELETE api/profile/:id/:photo_id
//@desc     Delete photo
//@access   Private

router.delete('/:id/:photo_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    // Pull photos from profile
    const photo = profile.photos.find(
      (photo) => photo.id === req.params.photo_id
    );

    // Make sure photo exists
    if (!photo) {
      return res.status(404).json({ msg: 'Photo not found' });
    }

    // Make sure user is authorized
    if (photo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = profile.photos
      .map((photo) => photo.id)
      .indexOf(req.params.photo_id);

    profile.photos.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

    fs.unlink(`client/public${photo.path}`, (err) => {
      if (err) console.error(err);
      console.log(`${photo.path} was deleted`);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
