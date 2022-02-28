import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { openModal } from '../../redux/auth/reducer/modalReducer';
import AppInput from '../../components/forms/AppInput';
import CustomAccordian from '../../components/customAccordian/CustomAccordian';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Please add a name'),
});

function SandBox() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.test);
  const history = useHistory();

  console.log(window.location.href);

  return (
    <Container>
      <Button
        content='Open Modal'
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
      />
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form className='ui form'>
          <AppInput type='text' name='name' placeholder='Add a name' />
          <Button color='red' content='Submit' type='submit' />
        </Form>
      </Formik>
      {/* <CustomVideoPlayer /> */}
      <CustomAccordian>
        <h1>Hello There</h1>
      </CustomAccordian>
      {/* <Switch /> */}
      <Button
        content='Login With Lacritz'
        onClick={() => {
          window.location = `http://localhost:9000?redirect=${window.location.href}`;
        }}
      />
    </Container>
  );
}

export default SandBox;
