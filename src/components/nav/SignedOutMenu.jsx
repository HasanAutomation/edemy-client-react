import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

function SignedOutMenu() {
  return (
    <Menu.Item position='right'>
      <Button basic inverted content='Login' onClick={() => {}} />
      <Button
        basic
        inverted
        content='Register'
        onClick={() => {}}
        style={{ marginLeft: 10 }}
      />
    </Menu.Item>
  );
}

export default SignedOutMenu;
