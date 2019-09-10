import React, { useState, useContext, useEffect } from 'react';
import MessageContext from '../../context/message/messageContext';
import AlertContext from '../../context/alert/alertContext';

const MessageForm = () => {
  const messageContext = useContext(MessageContext);
  const alertContext = useContext(AlertContext);

  const { addMessage, clearCurrentMessage, currentMessage } = messageContext;
  const {setAlert} = alertContext;

  useEffect(() => {
    if (currentMessage !== null) {
      setMessage({
        ...currentMessage,
        level:'Relax'
      });
    } else {
      setMessage({
        name: '',
        email: '',
        phone: '',
        msj:'',
        level: 'Relax'
      });
    }
  }, [messageContext, currentMessage]);

  const [message, setMessage] = useState({
    name: '',
    email: '',
    phone: '',
    msj:'',
    _id:'',
    level: 'Relax'
  });

  const { name, email, phone, msj, level} = message;

  const onChange = e =>
    setMessage({ ...message, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (currentMessage != null) {
      addMessage({
        msj:msj,
        _email:email,
        level
      });
      setAlert('Message Is Sending','success');
    }else{
      setAlert('Please Add Fields','danger');
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentMessage();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        Add Message
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
        disabled
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
        disabled
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
        disabled
      />
      <h5>Message Type</h5>
      <input
        type='radio'
        name='level'
        value='Relax'
        checked={level === 'Relax'}
        onChange={onChange}
      />{' '}
      Relax{' '}
      <input
        type='radio'
        name='level'
        value='Important'
        checked={level === 'Important'}
        onChange={onChange}
      />{' '}
      Important
      <textarea name="msj" value={msj} onChange={onChange}>
      </textarea>
      <div>
        <input
          type='submit'
          value='Add Message'
          className='btn btn-primary btn-block'
        />
      </div>
      {currentMessage && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default MessageForm;
