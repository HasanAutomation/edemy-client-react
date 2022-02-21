import cuid from 'cuid';
import { Form, Formik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Checkbox, FormField, Progress } from 'semantic-ui-react';
import * as Yup from 'yup';
import coursesApi from '../../api/courses';
import { closeModal } from '../../redux/auth/reducer/modalReducer';
import { updateCourse } from '../../redux/course/courseActions';
import { uploadToFirebase } from '../../services/firebaseService';
import { getFileExtension } from '../../utils/constant';
import AppInput from '../forms/AppInput';
import AppTextArea from '../forms/AppTextArea';
import ModalWrapper from './ModalWrapper';

const validationSchema = Yup.object({
  title: Yup.string().required('Please add a title'),
});

function LessonModal({ course, section }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [free_preview, setFreePreview] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    title: '',
    content: '',
    free_preview: false,
    video: null,
  };
  const { slug, instructor } = course;

  function handleVideoPhoto(file, setFieldValue) {
    setUploading(true);
    const filename = cuid() + '.' + getFileExtension(file.name);
    const uploadTask = uploadToFirebase(filename, file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      err => {
        toast.error(err.message);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(downloadURL => {
            setFieldValue('video', { downloadURL, name: filename });
            // setPreview({ downloadURL, name: filename });
          })
          .catch(err => {
            toast.error(err.message);
          })
          .finally(() => {
            setUploading(false);
          });
      }
    );
  }

  return (
    <ModalWrapper size='mini' header='Add a Lesson'>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const {
              data: { data },
            } = await coursesApi.addLesson({
              slug,
              instructor: instructor._id,
              sectionId: section._id,
              body: { ...values, free_preview },
            });

            dispatch(updateCourse(data.course));
            dispatch(closeModal());
          } catch (err) {
            err.response.data.errors.forEach(error => {
              toast.error(error.message || error.error);
            });
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue }) => (
          <Form className='ui form'>
            <AppInput name='title' placeholder='Lesson title' />
            <AppTextArea name='content' placeholder='Lesson Description' />
            <FormField>
              <label>Upload a Video</label>
              <input
                type='file'
                name='video'
                onChange={e => {
                  const file = e.target.files[0];
                  handleVideoPhoto(file, setFieldValue);
                }}
              />
            </FormField>
            <FormField>
              <label>Free Preview</label>
              <Checkbox
                toggle
                name='free_preview'
                value={free_preview}
                onChange={e => {
                  setFreePreview(!free_preview);
                }}
              />
            </FormField>

            {uploading && <Progress percent={progress} autoSuccess />}
            <Button
              content='Save'
              disabled={isSubmitting || !isValid || !dirty}
              loading={isSubmitting}
              color='teal'
              type='submit'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default LessonModal;
