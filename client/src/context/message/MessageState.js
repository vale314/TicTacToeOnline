import React, { useReducer } from 'react';
import axios from 'axios';
import MessageContext from './messageContext';
import messageReducer from './messageReducer';
import {
  GET_MESSAGES,
  DELETE_MESSAGE,
  SET_CURRENT_MESSAGE,
  CLEAR_CURRENT_MESSAGE,
  FILTER_MESSAGES,
  CLEAR_MESSAGES,
  CLEAR_FILTER_MESSAGE,
  MESSAGE_ERROR
} from '../types';

const MessageState = props => {
  const initialState = {
    messages: null,
    currentMessage: null,
    filteredMessages: null,
    errorMessages: null
  };

  const [state, dispatch] = useReducer(messageReducer, initialState);

  // Get Messages
  const getMessages = async () => {
    try {
      const res = await axios.get('/api/message');

      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Message
  const addMessage = async message => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post('/api/message', message, config);

    }catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Message
  const deleteMessage = async id => {
    try {
      await axios.delete(`/api/message/${id}`);

      dispatch({
        type: DELETE_MESSAGE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Messages
  const clearMessages = () => {
    dispatch({ type: CLEAR_MESSAGES });
  };

  // Set Current Message
  const setCurrentMessage = message => {
    dispatch({ type: SET_CURRENT_MESSAGE, payload: message });
  };

  // Clear Current Message
  const clearCurrentMessage = () => {
    dispatch({ type: CLEAR_CURRENT_MESSAGE });
  };

  // Filter Messages
  const filterMessages = text => {
    dispatch({ type: FILTER_MESSAGES, payload: text });
  };

  // Clear Filter
  const clearFilterMessage = () => {
    dispatch({ type: CLEAR_FILTER_MESSAGE });
  };

  return (
    <MessageContext.Provider
      value={{
        messages: state.messages,
        currentMessage: state.currentMessage,
        filteredMessages: state.filteredMessages,
        errorMessages: state.errorMessages,
        addMessage,
        deleteMessage,
        setCurrentMessage,
        clearCurrentMessage,
        filterMessages,
        clearFilterMessage,
        getMessages,
        clearMessages
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;
