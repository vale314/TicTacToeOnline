import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import { Input, Label, FormGroup } from 'reactstrap';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone:'',
    type:'personal',
    password: '',
    password2: ''
  });

  const { name, email, phone, type, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        phone,
        type,
        password
      });
    }
  };

  return (
    <div className='container'>
      <h1>
        Account <span className="text-center">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <Input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <Input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <Input
          type='text'
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={onChange}
          required
        />

        <h5>Contact Type</h5>
        <FormGroup check>
          <Label check>
            <Input
              type='radio'
              name='type'
              value='personal'
              checked={type === 'personal'}
              onChange={onChange}
            />{' '}
            Personal
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type='radio'
              name='type'
              value='professional'
              checked={type === 'professional'}
              onChange={onChange}
            />{' '}Professional
          </Label>
        </FormGroup>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <Input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <Input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;