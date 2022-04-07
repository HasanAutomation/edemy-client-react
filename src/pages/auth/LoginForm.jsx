import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import ModalWrapper from '../../components/modals/ModalWrapper';
import AppInput from '../../components/forms/AppInput';
import { Button, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/auth/reducer/modalReducer';
import authApi from '../../api/auth';
import { setUserData } from '../../redux/auth/actions/auth';

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
            const {
              data: { data },
            } = await authApi.login(values);
            dispatch(setUserData(data.user));
            setSubmitting(false);
            dispatch(closeModal());
          } catch (err) {
            console.log(err.response.data.errors);
            const error = err.response.data.errors[0].error;
            setErrors({ auth: error || 'Invalid Credentials' });
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
                // window.open(
                //   `http://localhost:9000?redirect=${window.location.href}`,
                //   '_blank',
                //   'location=yes,height=570,width=520,scrollbars=yes,status=yes'
                // );

                // window.open(
                //   `http://localhost:5001/auth?response_type=token&client_id=sample-client-id&redirect_url=${window.location.href}`
                // );

                dispatch(closeModal());
              }}
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default LoginForm;
