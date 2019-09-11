import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Users from './components/pages/AllUsers';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import Messages from './components/pages/messages';
import Game from './components/pages/demoGame/demo';
import Email from './components/pages/email';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import MessageState from './context/message/MessageState';
import ChatState from './context/chat/ChatState';
import GameOnline from './components/pages/game';

// import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ChatState>
        <ContactState>
          <MessageState>
            <AlertState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div className='container'>
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path='/' component={Home} />
                      <PrivateRoute exact path='/users' component={Users} />
                      <PrivateRoute exact path='/messages' component={Messages} />
                      <PrivateRoute exact path='/email' component={Email} />
                      <PrivateRoute exact path='/game' component={GameOnline} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/register' component={Register} />
                      <Route exact path='/login' component={Login} />
                      <Route exact pacth='/one-to-one' component={Game} />
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </AlertState>
          </MessageState>
        </ContactState>
      </ChatState>
    </AuthState>
  );
};

export default App;
