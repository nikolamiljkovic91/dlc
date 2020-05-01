import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing/Landing';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import Navbar from './components/layout/Navbar/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Fragment>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
