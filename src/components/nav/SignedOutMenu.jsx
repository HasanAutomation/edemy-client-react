import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import {
  LOGINFORM,
  openModal,
  REGISTERFORM,
} from '../../redux/auth/reducer/modalReducer';

function SignedOutMenu() {
  const dispatch = useDispatch();
  return (
    <Menu.Item position='right'>
      <Button
        basic
        inverted
        content='Login'
        onClick={() => {
          dispatch(openModal({ modalType: LOGINFORM }));
        }}
      />
      <Button
        basic
        inverted
        content='Register'
        onClick={() => {
          dispatch(openModal({ modalType: REGISTERFORM }));
        }}
        style={{ marginLeft: 10 }}
      />
    </Menu.Item>
  );
}

export default SignedOutMenu;
