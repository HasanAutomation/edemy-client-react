import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import ModalWrapper from '../../components/modals/ModalWrapper';
import AppInput from '../../components/forms/AppInput';
import { Button, Label } from 'semantic-ui-react';
import { signUpUserWithEmail } from '../../services/firebaseService';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/auth/reducer/modalReducer';

const validationSchema = Yup.object({
  displayName: Yup.string().required('Please add a display name'),
  email: Yup.string()
    .required('Please add an email')
    .email('Please add a valid email'),
  password: Yup.string().required('Please add a password').min(6),
});

function RegisterForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size='mini' header='Register an User'>
      <Formik
        initialValues={{
          displayName: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signUpUserWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (err) {
            setErrors({ auth: err.message });
            setSubmitting(false);
          }
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
            {errors.auth && <Label color='red' basic content={errors.auth} />}
            <Button
              type='submit'
              loading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
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
