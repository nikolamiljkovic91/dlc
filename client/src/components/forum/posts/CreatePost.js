import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../../store/actions/post';

const CreatePost = ({ createPost }) => {
  const [text, setText] = useState('');

  const inputHandler = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createPost({ text });
    setText('');
  };
  return (
    <section className='PostCommentForm'>
      <div>
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={onSubmit}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='...'
          value={text}
          required
          onChange={inputHandler}
        ></textarea>
        <input type='submit' className='Button' value='Submit' />
      </form>
    </section>
  );
};

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(CreatePost);
