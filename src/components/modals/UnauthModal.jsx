import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { openModal } from '../../redux/auth/reducer/modalReducer';

function UnauthModal({ history }) {
  const [open, setOpen] = useState(true);
  const { prevLocation } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  function handleClose() {
    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push('/courses');
    }
    setOpen(false);
  }
  return (
    <Modal open={open} size='mini' onClose={handleClose}>
      <Modal.Header content='You need to be logged in to do that' />
      <Modal.Content>
        <p>Please either login or register to see the content</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color='teal'
            content='Login'
            onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
          />
          <Button.Or />
          <Button
            fluid
            color='teal'
            content='Register'
            onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
          />
        </Button.Group>
        <Divider />
        <div>
          <p>Or Continue as Guest</p>
          <Button color='teal' content='Cancel' onClick={handleClose} />
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default UnauthModal;
