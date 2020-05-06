import React, { useState } from 'react';
import '../../index.scss';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../store/actions/alert';
import { register } from '../store/actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'Danger');
    } else {
      console.log(formData);
      register(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const { username, email, password, password2 } = formData;

  return (
    <div className='AuthSectionWrapper'>
      <h1>Sign Up</h1>
      <p>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form onSubmit={onSubmitHandler}>
        <div className='InputWrapper'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className='InputWrapper'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className='InputWrapper'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            minLength='6'
            onChange={onChangeHandler}
          />
        </div>
        <div className='InputWrapper'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            minLength='6'
            onChange={onChangeHandler}
          />
        </div>
        <input type='submit' value='Register' />
      </form>
      <p>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
