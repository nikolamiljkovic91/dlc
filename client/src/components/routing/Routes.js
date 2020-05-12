import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile/CreateProfile';
import Profile from '../profile/Profile';
import EditProfile from '../profile/EditProfile';

const Routes = () => {
  return (
    <div>
      <section className='SectionWrapper'>
        <Alert />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
            exact
            path='/create-profile'
            component={CreateProfile}
          />
          <PrivateRoute exact path='/profile/:id' component={Profile} />
          <PrivateRoute
            exact
            path='/edit-profile/:id'
            component={EditProfile}
          />
        </Switch>
      </section>
    </div>
  );
};

export default Routes;
