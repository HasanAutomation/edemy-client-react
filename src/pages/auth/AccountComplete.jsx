import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import AppInput from '../../components/forms/AppInput';
import { Button, Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/auth/reducer/modalReducer';
import authApi from '../../api/auth';
import { setUserData } from '../../redux/auth/actions/auth';

const validationSchema = Yup.object({
  name: Yup.string().required('Please add a display name'),
  password: Yup.string().required('Please add a password').min(6),
});

function AccountComplete() {
  const dispatch = useDispatch();
  const { preAuth } = useSelector(state => state.auth);
  return (
    <Formik
      initialValues={{
        name: '',
        email: preAuth?.email || '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const {
            data: { data },
          } = await authApi.completeRegistration(values);
          dispatch(setUserData(data.user));
          setSubmitting(false);
          dispatch(closeModal());
        } catch (err) {
          const errorMessage =
            err.response?.data.errors[0].error || 'Try Again';
          setErrors({ auth: errorMessage });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty, isValid, errors }) => (
        <Form className='ui form'>
          <AppInput name='name' placeholder='Please add a name' />
          <AppInput name='email' placeholder='Please add an email' disabled />
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
  );
}

export default AccountComplete;
