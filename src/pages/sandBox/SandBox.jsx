import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { openModal } from '../../redux/auth/reducer/modalReducer';
import AppInput from '../../components/forms/AppInput';
import CustomAccordian from '../../components/customAccordian/CustomAccordian';

const validationSchema = Yup.object({
  name: Yup.string().required('Please add a name'),
});

function SandBox() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.test);
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
    </Container>
  );
}

export default SandBox;
