import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MessageItem from './MessageItem';
import Spinner from '../layout/Spinner';
import MessageContext from '../../context/message/messageContext';

const Messages = () => {
  const messageContext = useContext(MessageContext);

  const { messages, filteredMessages, getMessages, loading } = messageContext;

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, []);

  if (messages !== null && messages.length === 0 && !loading) {
    return <h4>Please add a message</h4>;
  }

  return (
    <Fragment>
      {messages !== null && !loading ? (
        <TransitionGroup>
          {filteredMessages !== null
            ? filteredMessages.map(message => (
                <CSSTransition
                  key={message._id}
                  timeout={500}
                  classNames='item'
                >
                  <MessageItem message={message} />
                </CSSTransition>
              ))
            : messages.map(message => (
                <CSSTransition
                  key={message._id}
                  timeout={500}
                  classNames='item'
                >
                  <MessageItem message={message} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Messages;
