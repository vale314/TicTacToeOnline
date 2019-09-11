import React, { useReducer } from 'react';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';


import {
  ENDTOSESSION,
  STARTSESSION
} from '../types';

const ChatState = props => {
  const initialState = {
    connected:false,
    socket: null
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load User
  const startSession = async (payload) => {
    await dispatch({ type: STARTSESSION, payload:payload })
  };

  // Clear Errors
  const endSession = () => dispatch({ type: ENDTOSESSION });

  return (
    <ChatContext.Provider
      value={{
        connected: state.connected,
        startSession,
        endSession
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
