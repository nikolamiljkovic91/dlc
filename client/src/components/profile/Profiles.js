import React from 'react';
import ProfileItem from './ProfileItem/ProfileItem';
import { Link } from 'react-router-dom';

const Profiles = ({ profiles }) => {
  return (
    <section>
      <p>Would you like to create another profile?</p>
      <Link to='/create-profile' className='Button'>
        Create Profile
      </Link>
      <div className='Profiles'>
        <ProfileItem profiles={profiles} />
      </div>
    </section>
  );
};

export default Profiles;
