import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import Img from '../../../assets/images/dogAvatar.png';
import {
  likeComment,
  dislikeComment,
  deleteComment,
} from '../../../store/actions/post';
import Spinner from '../../layout/Spinner/Spinner';

const Comment = ({
  auth,
  postId,
  likeComment,
  dislikeComment,
  deleteComment,
  comment: { _id, text, likes, dislikes, date, user },
}) => {
  console.log(user);
  return (
    <section className='PostCommentItem'>
      <div>
        {typeof user === 'string' && !user.profiles ? (
          <Spinner />
        ) : (
          <Link to={`/user/${user._id}`}>
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
        <button
          className={
            !likes.find((like) => like.user === auth.user._id)
              ? 'PostCommentButtons'
              : 'PostCommentButtons LikeColor'
          }
          onClick={() => {
            likeComment(postId, _id);
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
            dislikeComment(postId, _id);
          }}
        >
          <i className='fas fa-heart-broken'></i>
          {dislikes.length > 0 && <span> {dislikes.length}</span>}
        </button>
        {!auth.loading && user._id === auth.user._id && (
          <button
            className='PostCommentButtons'
            onClick={() => deleteComment(postId, _id)}
          >
            <i className='fas fa-trash-alt'></i>
          </button>
        )}
      </div>
    </section>
  );
};

Comment.propTypes = {
  auth: PropTypes.object,
  post: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  likeComment,
  dislikeComment,
  deleteComment,
})(Comment);
