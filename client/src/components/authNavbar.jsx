import React, { Fragment } from "react";

import { Link } from 'react-router-dom'
import { Navbar, NavItem } from 'react-materialize';


class AuthNavbar extends React.Component {

  render() {
    return (
      <Fragment>
        <Navbar centerLogo >
          <Link to="/">
            <NavItem href="components.html">
              Home
            </NavItem>
          </Link>

          <Link to="/login">
            <NavItem >
              Login
            </NavItem>
          </Link>
          <Link to="/signup">
            <NavItem href="components.html">
              SignUp
            </NavItem>
          </Link>

        </Navbar>
      </Fragment>
    )
  }
}

export default AuthNavbar;