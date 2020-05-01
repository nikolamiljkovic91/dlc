import React from 'react';
import '../../../index.scss';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='AuthSectionWrapper'>
      <h1>Sign Up</h1>
      <p>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form>
        <div className='InputWrapper'>
          <input type='text' placeholder='Name' name='name' required />
        </div>
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
        <div className='InputWrapper'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
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

export default Register;
