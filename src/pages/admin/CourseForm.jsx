import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Button,
  FormField,
  Header,
  Label,
  Progress,
  Segment,
} from 'semantic-ui-react';
import AppInput from '../../components/forms/AppInput';
import AppTextArea from '../../components/forms/AppTextArea';
import AppSelectInput from '../../components/forms/AppSelectInput';
import cuid from 'cuid';
import { getFileExtension } from '../../utils/constant';
import {
  deleteFromFirebase,
  uploadToFirebase,
} from '../../services/firebaseService';
import { toast } from 'react-toastify';
import './CourseForm.scss';
import coursesApi from '../../api/courses';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object({
  name: Yup.string().required('Please provide a course name'),
  description: Yup.string().required('Please add a description'),
  paid: Yup.string().required('Please provide course type'),
});

const priceOptions = [
  { key: 'paid', text: 'Paid', value: 'true' },
  { key: 'free', text: 'Free', value: 'false' },
];

const priceValues = [];
for (let i = 200; i <= 1000; i += 100) {
  priceValues.push({ key: i.toString(), text: i.toString(), value: i });
}

function CourseForm() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');

  const history = useHistory();
  const { slug } = useParams();

  const selectedCourse = useSelector(state =>
    state.course.adminCourses.find(c => c.slug === slug)
  );
  const [preview, setPreview] = useState(selectedCourse?.image || null);
  const [isPaid, setIsPaid] = useState(selectedCourse?.paid || false);

  const initialValues = {
    ...selectedCourse,
    paid: selectedCourse?.paid ? 'true' : 'false',
  } ?? {
    name: '',
    description: '',
    price: 0,
    paid: '',
    category: '',
    image: null,
  };

  function handleUploadPhoto(file, setFieldValue) {
    setUploading(true);
    const filename = cuid() + '.' + getFileExtension(file.name);
    const uploadTask = uploadToFirebase(filename, file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      err => {
        toast.error(err.message);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(downloadURL => {
            setFieldValue('image', { downloadURL, name: filename });
            setPreview({ downloadURL, name: filename });
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

  async function deletePhoto(filename) {
    try {
      await deleteFromFirebase(filename);
      setPreview(null);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Segment
      clearing
      style={{
        marginTop: 30,
      }}
    >
      <Header
        textAlign='center'
        content={selectedCourse ? 'Update Course' : 'Create course'}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedCourse
              ? console.log('Updated Value', values)
              : await coursesApi.createCourse({
                  ...values,
                  paid: values.paid === 'true',
                });
            // history.push('/admin/dashboard');
          } catch (err) {
            err?.response?.data?.errors.forEach(error => {
              toast.error(error.message);
            });
            console.log(err.response.data.errors);
          } finally {
            setSubmitting(false);
          }
          // Make the request
          // Turn offf the loading indiactor
          // Rediredct to dashboard page
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid, setFieldValue, errors, touched }) => (
          <Form className='ui form'>
            <AppInput name='name' placeholder='Course Name' />
            <AppTextArea name='description' placeholder='Course Description' />
            <AppSelectInput
              name='paid'
              onSelectValue={value => {
                setIsPaid(value === 'true');
              }}
              placeholder='Course Type'
              options={priceOptions}
            />
            {isPaid && (
              <AppSelectInput
                name='price'
                placeholder='Course Price'
                options={priceValues}
              />
            )}
            <AppInput name='category' placeholder='Course category' />
            <FormField>
              <input
                type='file'
                name='imagePreview'
                onChange={e => {
                  const file = e.target.files[0];
                  handleUploadPhoto(file, setFieldValue);
                }}
              />
              {errors['imagePreview'] && touched['imagePreview'] ? (
                <Label basic color='red' content={errors['imagePreview']} />
              ) : null}
            </FormField>
            {uploading && <Progress percent={progress} autoSuccess />}
            {preview && (
              <div className='image-container'>
                <img src={preview.downloadURL} alt='preview' />
                <span onClick={() => deletePhoto(preview.name)}>X</span>
              </div>
            )}
            <Button
              content={selectedCourse ? 'Update' : 'Create'}
              type='submit'
              loading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
              color='teal'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default CourseForm;