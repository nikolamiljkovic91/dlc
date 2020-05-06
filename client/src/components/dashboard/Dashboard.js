import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAuthUser } from '../store/actions/auth';
import PropTypes from 'prop-types';

const Dashboard = ({ auth, getAuthUser }) => {
  useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  console.log(auth);

  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getAuthUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getAuthUser })(Dashboard);
