import React, { useContext, useEffect, Fragment, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import ChatContext from '../../context/chat/chatContext';
import AlertContext from '../../context/alert/alertContext';
import packageJson from '../../../package.json';

import { ListGroup, ListGroupItem, Button, Input } from 'reactstrap';


import io from 'socket.io-client';
var socket = io(packageJson.proxy);

const Home = (props) => {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { id_room } = chatContext;

  useEffect(() => {
    console.log(packageJson)
    authContext.loadUser();
    chatContext.startSession(socket.id);
    // eslint-disable-next-line
  }, []);

  const [state, setUser] = useState({
    users: [],
    chat: false,
    text: ''
  });

  const { users, text } = state;

  useEffect(() => {
    socket = io(packageJson.proxy);

    socket.emit('active', {
      token: localStorage.getItem('token'),
      room: 'home'
    });
    return(()=>{
      socket.emit('exit', {
        room: 'home'
      });
      socket.close();
    })
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

  const onClickButton = () => {
    const { socket_Id } = chatContext;
    console.log(socket_Id);
    socket.emit('exit', {
      room: 'home'
    });

    props.history.push({ pathname: '/game' })
  }

  const onChange = e => setUser({
    ...state, [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      chatContext.updateIdRoom(text);
      socket.emit('login-room', text);
      
      socket.emit('exit', {
        room: 'home'
      });

      props.history.push({ pathname: '/game' })
    }
  };

  const listUsers = (
    <Fragment>
      {
        id_room === '' ? <form onSubmit={onSubmit} style={{ display: 'flex' }}>
          <Input
            type='text'
            name='text'
            value={text}
            onChange={onChange}
            style={{ width: 'auto' }}
          />
          <Button color="primary" onClick={onSubmit}>Sumbit</Button>
        </form> :
          <div>

          </div>
      }

      <Button
        color="primary"
        onClick={onClickButton}
      >
        Start
      </Button>


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
