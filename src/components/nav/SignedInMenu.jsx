import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOut } from '../../services/firebaseService';
import { UserOutlined } from '@ant-design/icons';
import constants from '../../utils/constant';

function SignedInMenu({ user }) {
  const history = useHistory();

  async function handleSignOut() {
    try {
      await signOut();
      localStorage.removeItem(constants.TOKEN_KEY);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={user.photoURL} />
      <Dropdown pointing='top left' icon={null} text={user.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/my-courses' text='My Learning' />
          <Dropdown.Item as={Link} to={`/user/profile/12`} text='My Profile' />
          <Dropdown.Item as={Link} to={`/user/dashboard`} text='Dashboard' />
          {user.role === 'admin' && (
            <Dropdown.Item
              as={Link}
              to={`/admin/dashboard`}
              text='Admin Dashboard'
            />
          )}

          <Dropdown.Item as={Link} to='/account' text='My Account' />
          <Dropdown.Item
            text='Sign Out'
            onClick={async () => {
              await handleSignOut();
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
      <UserOutlined
        style={{
          marginLeft: 4,
        }}
      />
    </Menu.Item>
  );
}

export default SignedInMenu;
