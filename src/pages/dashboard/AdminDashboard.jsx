import React from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import CourseForm from '../admin/CourseForm';
import Draft from '../admin/Draft';

function AdminDashboard() {
  const routes = [
    {
      name: '',
      path: '/',
      component: null,
      exact: true,
      redirect() {
        return <Redirect to='/admin/dashboard/create-course' />;
      },
    },
    {
      name: 'Create Course',
      path: 'create-course',
      component: CourseForm,
    },
    {
      name: 'Draft Course',
      path: 'draft-course',
      component: Draft,
    },
  ];

  return <Sidebar menus={routes} />;
}

export default AdminDashboard;
