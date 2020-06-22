import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner/Spinner';
import PostItem from './PostItem';
import { getPost } from '../../../store/actions/post';
import CreateComment from './CreateComment';
import Comment from './Comment';

const Post = ({ match, post: { post, loading }, getPost }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/forum' className='Button'>
        Back To Posts
      </Link>
      <PostItem post={post} showButtons={false} />
      <CreateComment postId={post._id} />
      {post &&
        post.comments &&
        post.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} postId={post._id} />
        ))}
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(Post);
