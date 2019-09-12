import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import ChatContext from '../../context/chat/chatContext';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

const NavbarLayout = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const chatContext = useContext(ChatContext);


  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;
  const { socket } = chatContext;


  const onLogout = () => {
    logout();
    clearContacts();

    console.log(socket)
  };

  const [isOpen, setOpen] = useState({
    isOpen: true,
  });

  const toggle = () =>{
    setOpen({isOpen:!isOpen})
  }

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <NavItem componentClass='span'>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem componentClass='span'>
        <Link to='/register'>Register</Link>
      </NavItem>
      <NavItem componentClass='span'>
        <Link to='/login'>Login</Link>
      </NavItem>
    </Fragment>
  );

  return (
    <Navbar color="light" light expand="md">
      <h1>
        <Link to='/'>
          <NavbarBrand href="/">{title}</NavbarBrand>
        </Link>
      </h1>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav >{isAuthenticated ? authLinks : guestLinks}</Nav >
      </Collapse>
    </Navbar >
  );
};

NavbarLayout.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

NavbarLayout.defaultProps = {
  title: 'Tic Tac Toe',
  icon: 'fas fa-id-card-alt'
};

export default NavbarLayout;
