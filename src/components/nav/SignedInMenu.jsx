import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';

function SignedInMenu() {
  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src='/user.png' />
      <Dropdown pointing='top left' text='Hasan'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/my-courses' text='My Learning' />
          <Dropdown.Item
            as={Link}
            to={`/profile/12`}
            text='My Profile'
            icon='user'
          />
          <Dropdown.Item
            as={Link}
            to='/account'
            icon='settings'
            text='My Account'
          />
          <Dropdown.Item
            text='Sign Out'
            icon='power'
            onClick={async () => {}}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
