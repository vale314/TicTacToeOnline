import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MessageContext from '../../context/message/messageContext';

const MessageItem = ({ message }) => {
  const messageContext = useContext(MessageContext);
  const { deleteMessage, clearCurrentMessage } = messageContext;

  const { _id, name, email, phone, level, msj } = message;

  const onDelete = () => {
    deleteMessage(_id);
    clearCurrentMessage();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (level === 'Important' ? 'badge-success' : 'badge-primary')
          }
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p className='my-1'>
        {msj}
      </p>
      <p>
        <button
          className='btn btn-dark btn-sm'
        >
          Ver
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired
};

export default MessageItem;
