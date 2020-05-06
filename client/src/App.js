import React, { Fragment, useEffect } from 'react';
import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing/Landing';
import Navbar from './components/layout/Navbar/Navbar';
import Routes from './components/routing/Routes';
import setAuthToken from './components/utils/setAuthToken';
import { getAuthUser } from './components/store/actions/auth';
import { connect } from 'react-redux';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ getAuthUser }) => {
  useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  return (
    <Fragment>
      <BrowserRouter>
        <Route
          component={() =>
            window.location.pathname !== '/' ? <Navbar /> : null
          }
        />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default connect(null, { getAuthUser })(App);
