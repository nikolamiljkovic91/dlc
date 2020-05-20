import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../../assets/images/dlc-logo2.jpeg';
import * as classes from './Navbar.module.scss';
import PropTypes from 'prop-types';
import { logout } from '../../../store/actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className={classes.HideSmall}>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={() => logout()} to='/'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className={classes.HideSmall}>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className={classes.Navbar}>
      <div className={classes.ImgWrapper}>
        <Link to='/'>
          <img src={Logo} alt='dlc-logo' />
        </Link>
      </div>
      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
