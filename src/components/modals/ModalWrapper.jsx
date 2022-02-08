import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { closeModal } from '../../redux/auth/reducer/modalReducer';

function ModalWrapper({ children, size, header }) {
  const dispatch = useDispatch();
  return (
    <Modal size={size} open={true} onClose={() => dispatch(closeModal())}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

export default ModalWrapper;
