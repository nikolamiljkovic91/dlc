import React from 'react';
import ProfileItem from './ProfileItem';
import { Link } from 'react-router-dom';
import * as classes from './Profiles.module.scss';

const Profiles = ({ profiles }) => {
  return (
    <section className={classes.Dashboard}>
      <p>Would you like to create another profile?</p>
      <Link to='/create-profile' className='Button'>
        Create Profile
      </Link>
      <div className={classes.Profiles}>
        <ProfileItem profiles={profiles} />
      </div>
    </section>
  );
};

export default Profiles;
