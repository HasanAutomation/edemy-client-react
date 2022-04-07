import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { UserOutlined } from '@ant-design/icons';

function SignedInMenu({ user }) {
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={user.photoURL || '/user.png'} />
      <Dropdown
        pointing='top left'
        icon={null}
        text={user.displayName || user.name}
      >
        <Dropdown.Menu>
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
