import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Input, Button } from 'reactstrap';
import AlertContext from '../../context/alert/alertContext';

import AuthContext from '../../context/auth/authContext';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Messages = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

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
    socket.on('msg', payload => {
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
      socket.emit('msg', {
        text,
        token: localStorage.getItem('token')
      });
    }
  };

  return (
    <Fragment>
      {msg.map((message, index) => {
        return (
          <li key={index}>
            <b>{message.user}: {message.body}</b>
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
    </Fragment>
  );
};

export default Messages;
