import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

function Navbar() {
  const { authenticated } = useSelector(state => state.auth);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as={Link} to='/'>
          Edemy
        </Menu.Item>
        <Menu.Item as={NavLink} to='/sandbox'>
          Sandbox
        </Menu.Item>
        <Menu.Item as={NavLink} to='/courses'>
          Courses
        </Menu.Item>
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}

export default Navbar;
