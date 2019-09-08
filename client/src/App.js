import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';

import './App.css';
import './components/pages/home';

import 'bootstrap/dist/css/bootstrap.min.css';

import AuthNavbar from './components/authNavbar.jsx'
import Home from './components/pages/home';
import notFound from './components/pages/notFound';
import Login from './components/pages/login'
import SignUp from './components/pages/signUp'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthNavbar/>
        <Switch>
          <Route exact  path='/' component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route component={notFound} />
        </Switch>
      </Router>  
    </Provider>
  );
}

export default App;
