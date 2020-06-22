import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Alert from '../components/layout/Alert';
import Dashboard from '../components/dashboard/Dashboard';
import CreateProfile from '../components/profile/CreateProfile';
import Profile from '../components/profile/Profile/Profile';
import EditProfile from '../components/profile/EditProfile';
import Forum from '../components/forum/Forum';
import Post from '../components/forum/posts/Post';
import User from '../components/user/User';

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
          <PrivateRoute exact path='/forum' component={Forum} />
          <PrivateRoute exact path='/post/:id' component={Post} />
          <PrivateRoute exact path='/user/:id' component={User} />
        </Switch>
      </section>
    </div>
  );
};

export default Routes;
