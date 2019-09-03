import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';

import './App.css';
import './components/pages/home';

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

import AuthNavbar from './components/authNavbar.jsx'
import Home from './components/pages/home';
import notFound from './components/pages/notFound';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthNavbar/>
        <Switch>
          <Route exact  path='/' component={Home} />
          <Route component={notFound} />
        </Switch>
      </Router>  
    </Provider>
  );
}

export default App;
