import React, { useContext, useEffect, Fragment, useState } from 'react';
// import Contacts from '../contacts/Contacts';
// import ContactForm from '../contacts/ContactForm';
// import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';
import ChatContext from '../../context/chat/chatContext';
import AlertContext from '../../context/alert/alertContext';


import { ListGroup, ListGroupItem, Button, Input } from 'reactstrap';


import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Home = () => {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  useEffect(() => {
    authContext.loadUser();
    chatContext.startSession(socket);
    // eslint-disable-next-line
  }, []);

  const [state, setUser] = useState({
    msg: [],
    users: [],
    chat: false,
    text: '',
    id:null
  });

  const { users, chat, msg, id, text } = state;

  useEffect(() => {
    socket.emit('active', {
      token: localStorage.getItem('token')
    });
  }, []);

  useEffect(() => {
    socket.on('active', payload => {
      setUser({...state, users: payload });
    });
    // eslint-disable-next-line
  }, [users])

  useEffect(() => {
    socket.on('msg-private', payload => {
      console.log(payload)
      setUser({ ...state, msg: [...state.msg, payload] });
    });
    // eslint-disable-next-line
  }, [msg])


  const onClick = (e) => {
    const id = e.currentTarget.value;
    setUser({ ...state, chat: true, id:id})
  }

  const onChange = e => setUser({
    ...state, [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      socket.emit('msg-private', {
        text,
        id
      });
    }
  };

  const onClickSalir = () =>{
    setUser({ ...state, chat: false, id:null})
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


 const game = (
  (<Fragment>
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
  </Fragment>) 
 )


  return (
    <Fragment>{chat ? game : listUsers} </Fragment>
  );
};

export default Home;
