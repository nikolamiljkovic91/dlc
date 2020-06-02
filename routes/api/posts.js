const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route    POST api/posts
//@desc     Create post
//@access   Private

router.post(
  '/',
  auth,
  [check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ _id: req.user.id }).populate('profiles', [
      'profilePic',
    ]);

    try {
      const createPost = new Post({
        user: user,
        text: req.body.text,
      });

      const post = await createPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/posts
//@desc     Get all posts
//@access   Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: 'user',
        populate: { path: 'profiles', select: 'profilePic' },
      })
      .sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/posts/user_posts
//@desc     Get all posts of a current user
//@access   Private

router.get('/user_posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/posts/:id
//@desc     Get post by id
//@access   Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/posts/:id
//@desc     Delete post
//@access   Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/posts/like/:id
//@desc     Like post
//@access   Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      //   return res.status(400).json({ msg: 'Post already liked' });
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);
    } else {
      post.likes.unshift({ user: req.user.id });
    }

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/posts/dislike/:id
//@desc     Dislike post
//@access   Private

router.put('/dislike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.dislikes.filter((dislike) => dislike.user.toString() === req.user.id)
        .length > 0
    ) {
      //   return res.status(400).json({ msg: 'Post already disliked' });
      const removeIndex = post.dislikes
        .map((dislike) => dislike.user.toString())
        .indexOf(req.user.id);

      post.dislikes.splice(removeIndex, 1);
    } else {
      post.dislikes.unshift({ user: req.user.id });
    }

    await post.save();

    res.json(post.dislikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/posts/comment/:id
//@desc     Create comment
//@access   Private

router.put(
  '/comment/:post_id',
  auth,
  [check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        username: user.username,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    DELETE api/posts/comment/:id
//@desc     Delete comment
//@access   Private

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Pull the comment from the post
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Make sure user is authorized
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/posts/like/comment/:comment_id
//@desc     Like comment
//@access   Private

router.put('/like/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Pull the comment from the post
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check if the comment has already been liked
    if (
      comment.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      //   return res.status(400).json({ msg: 'Post already liked' });
      const removeIndex = comment.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      comment.likes.splice(removeIndex, 1);
    } else {
      comment.likes.unshift({ user: req.user.id });
    }

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/posts/dislike/comment/:comment_id
//@desc     Dislike comment
//@access   Private

router.put('/dislike/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Pull the comment from the post
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check if the comment has already been liked
    if (
      comment.dislikes.filter(
        (dislike) => dislike.user.toString() === req.user.id
      ).length > 0
    ) {
      //   return res.status(400).json({ msg: 'Post already liked' });
      const removeIndex = comment.dislikes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      comment.dislikes.splice(removeIndex, 1);
    } else {
      comment.dislikes.unshift({ user: req.user.id });
    }

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
