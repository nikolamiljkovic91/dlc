import React from 'react';
import { Link } from 'react-router-dom';
import * as classes from './ProfileItem.module.scss';
import Avatar from '../../../assets/images/dogAvatar.png';

const ProfileItem = ({ profiles }) => {
  return (
    profiles.length > 0 &&
    profiles.map((profile) => (
      <div className={classes.ProfileItem} key={profile._id}>
        <div className={classes.ImgWrapper}>
          {!profile.profilePic ? (
            <img src={Avatar} alt='img' />
          ) : (
            <img src={profile.profilePic} alt='img' />
          )}
        </div>
        <div>
          <h2>{profile.dogName}</h2>
          <Link to={`/profile/${profile._id}`}>View Profile</Link>
        </div>
      </div>
    ))
  );
};

export default ProfileItem;
