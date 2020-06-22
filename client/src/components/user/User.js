import React, { useEffect } from 'react';
import * as classes from './User.module.scss';
import { connect } from 'react-redux';
import { getUserById } from '../../store/actions/user';
import Spinner from '../layout/Spinner/Spinner';
import ProfileItem from '../profile/ProfileItem/ProfileItem';
import PropTypes from 'prop-types';

const User = ({ getUserById, match, user: { loading, user } }) => {
  useEffect(() => {
    getUserById(match.params.id);
  }, [getUserById, match.params.id]);

  console.log(user);

  return loading || user === null ? (
    <Spinner />
  ) : (
    user && (
      <div className={classes.User}>
        <h1>
          <i className='fas fa-user' /> {user.username}
        </h1>
        {user.profiles.length !== 0 && <h1>Profiles: </h1>}
        {user.profiles.length !== 0 && (
          <div className='Profiles'>
            <ProfileItem profiles={user.profiles} />
          </div>
        )}
      </div>
    )
  );
};

User.propTypes = {
  getUserById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserById })(User);
