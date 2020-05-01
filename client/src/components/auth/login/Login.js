import React from 'react';
import '../../../index.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='AuthSectionWrapper'>
      <h1>Sign In</h1>
      <p>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form>
        <div className='InputWrapper'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            required
          />
        </div>
        <div className='InputWrapper'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
          />
        </div>
        <input type='submit' value='Login' />
      </form>
      <p>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
