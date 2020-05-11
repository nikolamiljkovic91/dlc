import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../store/actions/auth';
import PropTypes from 'prop-types';

const Login = ({ signIn, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    signIn(formData);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const { email, password } = formData;

  return (
    <div className='AuthSectionWrapper'>
      <h1>Sign In</h1>
      <p>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form onSubmit={onSubmitHandler}>
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
        <input className='Button' type='submit' value='Login' />
      </form>
      <p>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signIn })(Login);
