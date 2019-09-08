import axios from 'axios';


import {
    LOGIN,
  } from '../actions/types'
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN:
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      try {
        const res = await axios.post('/api/auth', formData, config);
  
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
  
        loadUser();
      } catch (err) {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data.msg
        });
      }
      default:
        return state
    }
  }