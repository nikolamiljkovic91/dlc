const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  profiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profile',
    },
  ],
  // posts: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'post',
  //   },
  // ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
