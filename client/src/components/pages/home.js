import React, { useContext, useEffect, Fragment, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import ChatContext from '../../context/chat/chatContext';

import { ListGroup, ListGroupItem, Button, } from 'reactstrap';


import io from 'socket.io-client';
const socket = io('http://localhost:5000');

const Home = () => {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);

  useEffect(() => {
    authContext.loadUser();
    chatContext.startSession(socket);
    // eslint-disable-next-line
  }, []);

  const [state, setUser] = useState({
    users: [],
    chat: false
  });

  const { users } = state;

  useEffect(() => {
    socket.emit('active', {
      token: localStorage.getItem('token'),
      room: 'home'
    });
  }, []);

  useEffect(() => {
    socket.on('active', payload => {
      setUser({ ...state, users: payload });
    });
    // eslint-disable-next-line
  }, [users])

  const onClick = (e) => {
    const id = e.currentTarget.value;
    console.log(id);

    
  }

  const listUsers = (
    <Fragment>
      <ListGroup>
        {users.map((user, index) => {
          return (
            <ListGroupItem key={index} className="d-flex justify-content-between"> {user.name}
              <Button color="primary" key={user.id} value={user.id} onClick={onClick}>Start</Button>
            </ListGroupItem>
          )
        })
        }
      </ListGroup>
    </Fragment>
  );

  return (
    <Fragment>{listUsers} </Fragment>
  );
};

export default Home;
