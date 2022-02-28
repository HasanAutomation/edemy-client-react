import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import ModalWrapper from '../../components/modals/ModalWrapper';
import AppInput from '../../components/forms/AppInput';
import { Button, Label } from 'semantic-ui-react';
import { signInWithEmail } from '../../services/firebaseService';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/auth/reducer/modalReducer';
import { useLocation } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Please add an email')
    .email('Please add a valid email'),
  password: Yup.string().required('Please add a password').min(4),
});

function LoginForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size='mini' header='Login an User'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (err) {
            setErrors({ auth: 'Invalid Credentials' });
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className='ui form'>
            <AppInput name='email' placeholder='Please add an email' />
            <AppInput
              type='password'
              name='password'
              placeholder='Please add a password'
            />
            {errors.auth && <Label basic color='red' content={errors.auth} />}
            <Button
              fluid
              color='teal'
              content='SIGN IN'
              type='submit'
              disabled={isSubmitting || !isValid || !dirty}
              loading={isSubmitting}
            />
            <Button
              style={{
                marginTop: 10,
              }}
              content='Login With Lacritz'
              fluid
              onClick={() => {
                window.location = `http://localhost:9000?redirect=${window.location.href}`;
              }}
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default LoginForm;
