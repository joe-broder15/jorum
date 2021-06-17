// navbar component
import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import Logout from "../Auth/Logout";

import AuthContext from "../../contexts/AuthContext";
import UserLink from "../../components/Users/UserLink";

export default function AppNavbar() {
  const { authState, setAuthState, userState, setUserState } =
    React.useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="md" style={{ padding: "5px" }}>
      <Navbar.Brand href="/">Forum</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-between"
      >
        <Nav className="mr-auto"></Nav>
        <Nav>
          {/* login controls */}
          {authState && userState != null ? (
            <NavDropdown
              title={"my profile"}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>
                <UserLink user={userState.username} />
              </NavDropdown.Item>

              {/* admin controls */}
              {userState.privilege > 1 ? (
                <Fragment>
                  <NavDropdown.Item>
                    <Link to="/admin/users">Users</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/topics">Topics</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/threads">Threads</Link>
                  </NavDropdown.Item>
                </Fragment>
              ) : (
                ""
              )}

              <Logout />
            </NavDropdown>
          ) : (
            <Fragment>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/register">Register</Link>
              </Nav.Link>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
