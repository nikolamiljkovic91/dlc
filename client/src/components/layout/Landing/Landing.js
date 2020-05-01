import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as classes from './Landing.module.scss';

const Landing = () => {
  return (
    <div className={classes.Landing}>
      <div className={classes.Container}>
        <div className={classes.Headline}>
          <h1>Dog Lovers Club</h1>
          <p>Connect with other dog lovers</p>
        </div>
        <div className={classes.Buttons}>
          <a href='/register'>Sign Up</a>
          <a href='/login'>Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
