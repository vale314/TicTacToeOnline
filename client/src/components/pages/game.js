import React, { useContext, useEffect, Fragment, useState } from 'react';

import { Input, Button } from 'reactstrap';

import AlertContext from '../../context/alert/alertContext';

import AuthContext from '../../context/auth/authContext';
import ChatContext from '../../context/chat/chatContext';

import Board from '../../components/Game/index';

import io from 'socket.io-client';
const socket = io('http://165.227.83.64:3000/');

const Game = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const chatContext = useContext(ChatContext);

  const { setAlert } = alertContext;

  const { id_room } = chatContext;

  const [user, setUser] = useState({
    text: '',
    msg: []
  });

  const { text, msg } = user;

  useEffect(() => {

    authContext.loadUser();
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    if (id_room === '') {
      chatContext.generateIdRoom();
    } else {
      socket.emit('login-room', id_room);
    }
    // eslint-disable-next-line
  }, [id_room !== ''])

  useEffect(() => {
    socket.on('msg-room', payload => {
      
      setUser({ ...user, msg: [...user.msg, payload] });
    });
    // eslint-disable-next-line
  }, [msg])



  const onChange = e => setUser({
    ...user, [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      socket.emit('msg-room', {
        text,
        room: id_room,
        token: localStorage.getItem('token')
      });
      setUser({ ...user, text: '' })
    }
  };

  const onClickExit = () => {

    socket.emit('exit', {
      room: 'home'
    });

    chatContext.deleteIdRoom();
    props.history.push({ pathname: '/' })
  }

  return (
    <Fragment>

      <div className="game d-flex justify-content-center">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>

      <div>
        <h1>
          ID_ROOM: {id_room}
        </h1>
      </div>
      {msg.map((message, index) => {
        return (
          <li key={index}>
            <b>{message.name}: {message.body}</b>
          </li>
        )
      })};

      <form onSubmit={onSubmit}>
        <Input
          type='text'
          name='text'
          value={text}
          onChange={onChange}
        />
        <Button color="primary" onClick={onSubmit}>Sumbit</Button>
      </form>
      <Button color="primary" onClick={onClickExit}>Exit</Button>
    </Fragment>
  );
};

export default Game;
