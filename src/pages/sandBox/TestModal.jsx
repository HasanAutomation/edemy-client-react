import React from 'react';
import ModalWrapper from '../../components/modals/ModalWrapper';

function TestModal({ data }) {
  return (
    <ModalWrapper size='mini' header='Test Modal'>
      <div>Test DATA : {data}</div>
    </ModalWrapper>
  );
}

export default TestModal;
