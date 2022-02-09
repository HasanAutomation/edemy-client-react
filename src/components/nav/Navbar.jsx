import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Container, Menu, Segment } from 'semantic-ui-react';
import AppInput from '../forms/AppInput';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

function Navbar() {
  const { authenticated, user } = useSelector(state => state.auth);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as={Link} to='/'>
          <h1>Edemy</h1>
        </Menu.Item>
        <Menu.Item as={NavLink} to='/sandbox'>
          Sandbox
        </Menu.Item>
        <Menu.Item as={NavLink} to='/courses'>
          Courses
        </Menu.Item>
        <Segment
          style={{
            width: '50%',
            marginLeft: 20,
            height: 50,
            borderRadius: 30,
          }}
        >
          <Formik
            initialValues={{
              query: '',
            }}
            onSubmit={values => {}}
          >
            <Form>
              <AppInput
                className='search-input'
                name='query'
                placeholder='Search for anything...'
              />
            </Form>
          </Formik>
        </Segment>
        {authenticated && (
          <Menu.Item position='right' as={NavLink} to='/my-learning'>
            My Learning
          </Menu.Item>
        )}

        {authenticated ? <SignedInMenu user={user} /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}

export default Navbar;
