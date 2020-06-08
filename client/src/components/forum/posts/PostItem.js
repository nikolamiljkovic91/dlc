import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import Img from '../../../assets/images/dogAvatar.png';
import Spinner from '../../layout/Spinner/Spinner';
import { likePost, dislikePost, deletePost } from '../../../store/actions/post';

const PostItem = ({
  auth,
  likePost,
  dislikePost,
  deletePost,
  showButtons,
  post: { _id, text, likes, dislikes, comments, date, user },
}) => {
  return (
    <section className='PostCommentItem'>
      <div>
        {typeof user === 'string' && !user.profiles ? (
          <Spinner />
        ) : (
          <Link to={`/profile/${user._id}`}>
            <h4>@{user.username}</h4>
            <div>
              {user.profiles.slice(0, 3).map((profile) => (
                <div className='ImgWrapper' key={profile._id}>
                  <img src={profile.profilePic || Img} alt='img' />
                </div>
              ))}
            </div>
          </Link>
        )}
      </div>
      <div className='PostCommentContent'>
        <p>{text}</p>
        <p>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showButtons && (
          <Fragment>
            <button
              className={
                !likes.find((like) => like.user === auth.user._id)
                  ? 'PostCommentButtons'
                  : 'PostCommentButtons LikeColor'
              }
              onClick={() => {
                likePost(_id);
              }}
            >
              <i className='fas fa-heart'></i>
              {likes.length > 0 && <span> {likes.length}</span>}
            </button>
            <button
              className={
                !dislikes.find((dislike) => dislike.user === auth.user._id)
                  ? 'PostCommentButtons'
                  : 'PostCommentButtons DislikeColor'
              }
              onClick={() => {
                dislikePost(_id);
              }}
            >
              <i className='fas fa-heart-broken'></i>
              {dislikes.length > 0 && <span> {dislikes.length}</span>}
            </button>
            <Link to={`/post/${_id}`} className='PostCommentButtons'>
              <i className='fas fa-comment'></i>
              {comments.length > 0 && <span> {comments.length}</span>}
            </Link>
            {!auth.loading && user._id === auth.user._id && (
              <button
                className='PostCommentButtons'
                onClick={() => deletePost(_id)}
              >
                <i className='fas fa-trash-alt'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </section>
  );
};

PostItem.defaultProps = {
  showButtons: true,
};

PostItem.propTypes = {
  auth: PropTypes.object,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  // post: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { likePost, dislikePost, deletePost })(
  PostItem
);
