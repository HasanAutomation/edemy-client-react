import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import coursesApi from '../../api/courses';
import { closeModal } from '../../redux/auth/reducer/modalReducer';
import { updateCourse } from '../../redux/course/courseActions';
import AppInput from '../forms/AppInput';
import ModalWrapper from './ModalWrapper';

const validationSchema = Yup.object({
  title: Yup.string().required('Please add a title'),
});

function SectionModal({ course }) {
  const initialValues = {
    title: '',
  };
  const dispatch = useDispatch();

  return (
    <ModalWrapper header='Add a section' size='mini'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const {
              data: { data },
            } = await coursesApi.addSection(
              course.slug,
              course.instructor._id,
              values
            );
            dispatch(updateCourse(data.course));
            dispatch(closeModal());
          } catch (err) {
            console.log(err.response.data.errors);
            err.response.data.errors.forEach(error => {
              toast.error(error.message || error.error);
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className='ui form'>
            <AppInput name='title' placeholder='Add a title' />
            <Button
              content='Add'
              disabled={isSubmitting || !isValid || !dirty}
              loading={isSubmitting}
              type='submit'
              color='teal'
              fluid
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default SectionModal;
