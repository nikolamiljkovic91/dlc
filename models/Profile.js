const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  profilePic: {
    type: String,
    default: 'avatar',
  },
  dogName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
  },
  photos: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      photo: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
