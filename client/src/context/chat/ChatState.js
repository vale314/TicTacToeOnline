import React, { useReducer } from 'react';
import shortid from 'shortid';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';


import {
  ENDTOSESSION,
  STARTSESSION,
  GENERATEIDROOM,
  UPDATEIDROOM,
  DELETEIDROOM
} from '../types';

const ChatState = props => {
  const initialState = {
    connected:false,
    socket: '',
    id_room:''
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  const generateIdRoom = () => {
    const key = shortid.generate();
    dispatch({type: GENERATEIDROOM, payload: key})
  }

  // Load User
  const startSession = (payload) => {
     dispatch({ type: STARTSESSION, payload:payload })
  };

  // Clear Errors
  const endSession = () => dispatch({ type: ENDTOSESSION });

  const updateIdRoom = (payload) => dispatch ({ type:UPDATEIDROOM,  payload});

  const deleteIdRoom = () => { dispatch({type:DELETEIDROOM}) }

  return (
    <ChatContext.Provider
      value={{
        connected: state.connected,
        id_room: state.id_room,
        socket_Id:state.socket,
        startSession,
        endSession,
        generateIdRoom,
        updateIdRoom,
        deleteIdRoom
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
