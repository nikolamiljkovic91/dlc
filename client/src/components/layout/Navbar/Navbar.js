import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/dlc-logo2.jpeg';
import * as classes from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={classes.Navbar}>
      <div className={classes.ImgWrapper}>
        <Link to='/'>
          <img src={Logo} alt='dlc-logo' />
        </Link>
      </div>
      <ul>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
