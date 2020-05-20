import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAuthUser } from '../../store/actions/auth';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner/Spinner';
import * as classes from './Dashboard.module.scss';
import Profiles from '../profile/Profiles';
import { getProfiles } from '../../store/actions/profile';

const Dashboard = ({
  auth: { loading, user },
  getAuthUser,
  getProfiles,
  profile,
}) => {
  useEffect(() => {
    getAuthUser();
    getProfiles();
  }, [getAuthUser, getProfiles]);

  console.log(profile.profiles);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className={classes.Dashboard}>
        <h1>Dashboard</h1>
        <p>
          <i className='fas fa-user' /> Welcome {user && user.username}
        </p>
        {profile.loading || profile.profiles === null ? (
          <Fragment>
            {' '}
            <p>You have not yet setup a dog profile?</p>
            <Link to='/create-profile' className='Button'>
              Create Profile
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Profiles profiles={profile.profiles} />
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getAuthUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getAuthUser, getProfiles })(
  Dashboard
);
