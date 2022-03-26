import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import AppInput from '../../components/forms/AppInput';
import { Button, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import authApi from '../../api/auth';
import { toast } from 'react-toastify';
import { setPreAuth } from '../../redux/auth/actions/auth';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Please add an email')
    .email('Please add a valid email'),
});

function EmailForm({ handleNextForm, stepNumber }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const {
            data: { data },
          } = await authApi.sendVerificationOtp(values.email);
          const { message, hash, email } = data;
          toast.success(message);
          dispatch(setPreAuth({ hash, email }));
          handleNextForm(stepNumber + 1);
          setSubmitting(false);
        } catch (err) {
          const error = err.response?.data.errors[0].error;
          setErrors({ auth: error || 'Please try again!' });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty, isValid, errors }) => (
        <Form className='ui form'>
          <AppInput name='email' placeholder='Please add an email' />
          {errors.auth && <Label color='red' basic content={errors.auth} />}
          <Button
            type='submit'
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            fluid
            color='teal'
            content='Get Started'
          />
        </Form>
      )}
    </Formik>
  );
}

export default EmailForm;
