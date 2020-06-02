import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAuthUser } from '../../store/actions/auth';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner/Spinner';
import Profiles from '../profile/Profiles';
import { getProfiles } from '../../store/actions/profile';
import { userPosts } from '../../store/actions/post';

const Dashboard = ({
  auth: { loading, user },
  getAuthUser,
  getProfiles,
  profile,
  userPosts,
  post,
}) => {
  useEffect(() => {
    getAuthUser();
    getProfiles();
    userPosts();
  }, [getAuthUser, getProfiles, userPosts]);

  console.log(post);

  return loading ? (
    <Spinner />
  ) : (
    <section className='DashboardForum'>
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
  );
};

Dashboard.propTypes = {
  getAuthUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {
  getAuthUser,
  getProfiles,
  userPosts,
})(Dashboard);
