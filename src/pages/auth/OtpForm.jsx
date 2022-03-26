import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import AppInput from '../../components/forms/AppInput';
import { Button, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import authApi from '../../api/auth';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  otp: Yup.number().required('Please enter the otp'),
});

function OtpForm({ handleNextForm, stepNumber }) {
  const { preAuth } = useSelector(state => state.auth);

  return (
    <Formik
      initialValues={{ otp: '' }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const {
            data: { data },
          } = await authApi.verifyVerificationOtp({ ...preAuth, ...values });
          toast.success(data.message);
          handleNextForm(stepNumber + 1);
          setSubmitting(false);
        } catch (err) {
          const errorMessage = err.response?.data?.errors[0].error;
          setErrors({ auth: errorMessage || 'Invalid OTP' });
          setSubmitting(false);
        }
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, dirty, isValid, errors }) => (
        <Form className='ui form'>
          <AppInput name='otp' placeholder='Please enter the otp' />
          {errors.auth && <Label basic color='red' content={errors.auth} />}
          <Button
            fluid
            color='teal'
            content='Submit'
            type='submit'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}

export default OtpForm;
