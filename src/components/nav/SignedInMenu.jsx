import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOut } from '../../services/firebaseService';

function SignedInMenu({ user }) {
  const history = useHistory();

  async function handleSignOut() {
    try {
      await signOut();
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={user.photoURL} />
      <Dropdown pointing='top left' text={user.displayName}>
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
            onClick={async () => {
              await handleSignOut();
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
