import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../store/actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    dogName: '',
    about: '',
    dateOfBirth: '',
    gender: '',
  });

  const inputHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const { dogName, about, dateOfBirth, gender } = formData;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    createProfile(formData);
    history.push('/dashboard');
  };
  return (
    <section className='ProfileForm'>
      <h1>Create Profile</h1>
      <p>
        <i className='fas fa-paw' /> Add some info about your dog
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmitHandler}>
        <div className='InputWrapper'>
          <input
            type='text'
            placeholder='* Dog Name'
            name='dogName'
            value={dogName}
            required
            onChange={inputHandler}
          />
          <small>What is your dog name?</small>
        </div>
        <div className='InputWrapper'>
          <input
            type='text'
            placeholder='About'
            name='about'
            value={about}
            onChange={inputHandler}
          />
          <small>Tell us something about your dog</small>
        </div>
        <div className='InputWrapper'>
          <input
            type='date'
            placeholder='Date Of Birth'
            name='dateOfBirth'
            value={dateOfBirth}
            onChange={inputHandler}
          />
          <small>Dogs birthday</small>
        </div>
        <div className='InputWrapper'>
          <select name='gender' value={gender} onChange={inputHandler}>
            <option value=''>Gender</option>d<option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          <small>Choose dogs gender</small>
        </div>
        {/* <div className='InputWrapper'>
          <input
            type='file'
            placeholder='Profile Picture'
            name='profilePic'
            value={profilePic}
            onChange={inputHandler}
          />
          <small>Upload profile picture of your dog (less than 1MB)</small>
        </div> */}
        <input type='submit' className='Button' value='Submit' />
        <Link className='Button' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
