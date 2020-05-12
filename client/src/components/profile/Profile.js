import '../../index.scss';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import * as classes from './Profile.module.scss';
import Avatar from '../../assets/images/dogAvatar.png';
import { connect } from 'react-redux';
import { getProfile, deleteProfile } from '../store/actions/profile';
import Spinner from '../layout/Spinner/Spinner';
import Moment from 'react-moment';

const Profile = ({
  getProfile,
  match,
  auth,
  deleteProfile,
  history,
  profile: { profile, loading },
}) => {
  useState(() => {
    getProfile(match.params.id);
  });

  return loading ? (
    <Spinner />
  ) : (
    profile && (
      <Fragment>
        {auth.loading === false && auth.user._id === profile.user && (
          <Link to={`/edit-profile/${profile._id}`} className='Button'>
            Edit Profile
          </Link>
        )}
        {auth.loading === false && auth.user._id === profile.user && (
          <button
            onClick={() => deleteProfile(match.params.id, history)}
            className='Button'
          >
            Delete Profile
          </button>
        )}
        <div className={classes.Profile}>
          <img src={Avatar} alt='' />
          <h1>{profile.dogName}</h1>
          {profile.dateOfBirth && (
            <p>
              <i className='fas fa-birthday-cake'></i>{' '}
              <Moment format='DD/MM/YYYY'>{profile.dateOfBirth}</Moment>
            </p>
          )}
          {profile.gender && <p>{profile.gender}</p>}
        </div>
        {profile.about && (
          <div className={classes.About}>
            <h2>About {profile.dogName}</h2>
            <p>{profile.about}</p>
          </div>
        )}
      </Fragment>
    )
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile, deleteProfile })(
  withRouter(Profile)
);