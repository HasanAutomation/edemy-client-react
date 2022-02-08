import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import ModalWrapper from '../../components/modals/ModalWrapper';
import AppInput from '../../components/forms/AppInput';
import { Button } from 'semantic-ui-react';

const validationSchema = Yup.object({
  displayName: Yup.string().required('Please add a display name'),
  email: Yup.string()
    .required('Please add an email')
    .email('Please add a valid email'),
  password: Yup.string().required('Please add a password').min(4),
});

function RegisterForm() {
  return (
    <ModalWrapper size='mini' header='Register an User'>
      <Formik
        initialValues={{
          displayName: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className='ui form'>
            <AppInput name='displayName' placeholder='Please add a name' />
            <AppInput name='email' placeholder='Please add an email' />
            <AppInput
              type='password'
              name='password'
              placeholder='Please add a password'
            />
            <Button
              type='submit'
              loading={isSubmitting}
              disabled={isSubmitting || !isValid || dirty}
              fluid
              color='teal'
              content='SIGN UP'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default RegisterForm;
