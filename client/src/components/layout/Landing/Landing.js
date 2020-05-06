import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as classes from './Landing.module.scss';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={classes.Landing}>
      <div className={classes.Container}>
        <div className={classes.Headline}>
          <h1>Dog Lovers Club</h1>
          <p>Connect with other dog lovers</p>
        </div>
        <div className={classes.Buttons}>
          <Link to='/register'>Sign Up</Link>
          <Link to='/login'>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
