import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';

function AdminModal({ history }) {
  const [open, setOpen] = useState(true);
  const { prevLocation } = useSelector(state => state.auth);

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
      <Modal.Header content='You are not authorized to view this page' />
      <Modal.Content>
        <div>
          <p>Continue</p>
          <Button color='teal' content='Cancel' onClick={handleClose} />
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default AdminModal;
