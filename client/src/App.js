import './index.scss';
import 'react-image-lightbox/style.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing/Landing';
import Navbar from './components/layout/Navbar/Navbar';
import Routes from './routing/Routes';
import setAuthToken from './utils/setAuthToken';
import { getAuthUser } from './store/actions/auth';
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
