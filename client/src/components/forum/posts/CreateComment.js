import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../../store/actions/post';
import PropTypes from 'prop-types';

const CreateComment = ({ createComment, postId }) => {
  const [text, setText] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    createComment({ text }, postId);
    setText('');
  };

  return (
    <div className='PostCommentForm'>
      <div>
        <h3>Leave a Comment</h3>
      </div>
      <form onSubmit={onSubmit}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Type a comment'
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' className='Button' value='Submit' />
      </form>
    </div>
  );
};

CreateComment.propTypes = {
  createComment: PropTypes.func.isRequired,
};

export default connect(null, { createComment })(CreateComment);
