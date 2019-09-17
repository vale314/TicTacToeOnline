import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

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

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const [state, setOpen] = useState({
    isOpen: false,
  });

  const { isOpen } = state;

  const toggle = () => {
    setOpen({ isOpen: !isOpen })
  }

  const authLinks = (
    <Fragment>
      <NavItem componentClass='span'>
        <Link to='/messages' >
          <i class="fas fa-envelope"></i>
          <span className='hide-sm'>Messages</span>
        </Link>
      </NavItem>
    </Fragment>
  );

  const authLinks2 = (
    <Fragment>
        <Link className="mr-5 d-inline-block" to='/' onClick={onLogout}>
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'>Logout</span>
        </Link>
      <div className=" d-inline-block">Hello {user && user.name}</div>
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

  const guestLinks2 = (
    <Fragment>
     
    </Fragment>
  );

  return (
    <Navbar color="light" light expand="md">
      <NavItem componentClass='span' style={{ display: 'block' }}>
        <h1>
          <Link to='/'>
            <NavbarBrand href="/">{title}</NavbarBrand>
          </Link>
        </h1>
      </NavItem>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={state.isOpen} navbar >
        <Nav>{isAuthenticated ? authLinks : guestLinks}</Nav >
      </Collapse>
      <span class="navbar-text" >
        {isAuthenticated ? authLinks2 : guestLinks2}
      </span>
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
