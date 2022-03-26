import React from 'react';
import ModalWrapper from '../../components/modals/ModalWrapper';
import EmailForm from './EmailForm';
import { useState } from 'react';
import OtpForm from './OtpForm';
import AccountComplete from './AccountComplete';

const steps = {
  1: EmailForm,
  2: OtpForm,
  3: AccountComplete,
};

function RegisterForm() {
  const [stepNumber, setStepNumber] = useState(1);

  const FormComponent = steps[stepNumber];

  function handleNextForm() {
    setStepNumber(number => number + 1);
  }

  return (
    <ModalWrapper
      size='mini'
      header={
        stepNumber === 1
          ? 'Get Started'
          : stepNumber === 2
          ? 'OTP Verification'
          : 'Complete Account'
      }
    >
      <FormComponent handleNextForm={handleNextForm} stepNumber={stepNumber} />
    </ModalWrapper>
  );
}

export default RegisterForm;
