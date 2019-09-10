import {
    GET_MESSAGES,
    ADD_MESSAGE,
    DELETE_MESSAGE,
    SET_CURRENT_MESSAGE,
    CLEAR_CURRENT_MESSAGE,
    FILTER_MESSAGES,
    CLEAR_MESSAGES,
    CLEAR_FILTER_MESSAGE,
    MESSAGE_ERROR
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
      case GET_MESSAGES:
        return {
          ...state,
          messages: action.payload,
          loading: false
        };
      case ADD_MESSAGE:
        return {
          ...state,
          messages: [action.payload, ...state.messages],
          loading: false
        };
      case DELETE_MESSAGE:
        return {
          ...state,
          messages: state.messages.filter(
            message => message._id !== action.payload
          ),
          loading: false
        };
      case CLEAR_MESSAGES:
        return {
          ...state,
          messages: null,
          filteredMessages: null,
          errorMessages: null,
          currentMessage: null
        };
      case SET_CURRENT_MESSAGE:
        return {
          ...state,
          currentMessage: action.payload
        };
      case CLEAR_CURRENT_MESSAGE:
        return {
          ...state,
          currentMessage: null
        };
      case FILTER_MESSAGES:
        return {
          ...state,
          filteredMessages: state.messages.filter(message => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return message.name.match(regex) || message.email.match(regex);
          })
        };
      case CLEAR_FILTER_MESSAGE:
        return {
          ...state,
          filteredMessages: null
        };
      case MESSAGE_ERROR:
        return {
          ...state,
          errorMessages: action.payload
        };
      default:
        return state;
    }
  };
  