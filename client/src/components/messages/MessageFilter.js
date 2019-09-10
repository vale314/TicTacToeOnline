import React, { useContext, useRef, useEffect, Fragment } from 'react';
import MessageContext from '../../context/message/messageContext';

const MessageFilter = () => {
  const messageContext = useContext(MessageContext);
  const text = useRef('');

  const { filterMessages, clearFilterMessage, filteredMessages } = messageContext;

  useEffect(() => {
    if (filteredMessages === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterMessages(e.target.value);
    } else {
      clearFilterMessage();
    }
  };

  const onClick = () =>{
    
  }

  return (
    <Fragment>
      <form>
        <input
          ref={text}
          type='text'
          placeholder='Filter Messages'
          onChange={onChange}
        />
      </form>
      <button className='btn btn-success btn-block'>
        Actualizar
      </button>
    </Fragment>
  );
};

export default MessageFilter;
