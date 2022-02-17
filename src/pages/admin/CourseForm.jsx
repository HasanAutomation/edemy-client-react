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

const validationSchema = Yup.object({
  name: Yup.string().required('Please provide a course name'),
  description: Yup.string().required('Please add a description'),
  paid: Yup.string().required('Please provide course type'),
  // imagePreview: Yup.object().required('Please select an image'),
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
  const [isPaid, setIsPaid] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');

  const initialValues = {
    name: '',
    description: '',
    price: 0,
    paid: true,
    category: '',
    imagePreview: null,
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
            setFieldValue('imagePreview', { downloadURL, name: filename });
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
      <Header textAlign='center' content='Create course' />
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
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
            {/* <AppFileInput name='imagePreview' placeholder='Course Image' /> */}
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
                <img src={preview.downloadURL} />
                <span onClick={() => deletePhoto(preview.name)}>X</span>
              </div>
            )}
            <Button
              content='Create'
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
