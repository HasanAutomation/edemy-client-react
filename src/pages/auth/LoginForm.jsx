import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import ModalWrapper from '../../components/modals/ModalWrapper';
import AppInput from '../../components/forms/AppInput';
import { Button } from 'semantic-ui-react';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Please add an email')
    .email('Please add a valid email'),
  password: Yup.string().required('Please add a password').min(4),
});

function LoginForm() {
  return (
    <ModalWrapper size='mini' header='Login an User'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className='ui form'>
            <AppInput name='email' placeholder='Please add an email' />
            <AppInput name='password' placeholder='Please add a password' />
            <Button
              fluid
              color='teal'
              content='SIGN IN'
              type='submit'
              disabled={isSubmitting || !isValid || !dirty}
              loading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default LoginForm;
