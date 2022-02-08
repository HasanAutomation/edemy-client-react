import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../../pages/auth/LoginForm';
import RegisterForm from '../../pages/auth/RegisterForm';
import TestModal from '../../pages/sandBox/TestModal';

function ModalManager() {
  const modalLookup = { TestModal, RegisterForm, LoginForm };
  const currentModal = useSelector(state => state.modals);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
}

export default ModalManager;
