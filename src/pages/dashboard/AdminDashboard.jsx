import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Course from '../admin/Course';
import CourseForm from '../admin/CourseForm';
import Draft from '../admin/Draft';
import Dashboard from './Dashboard';

function AdminDashboard() {
  const routes = [
    {
      name: 'Dashboard',
      path: '/',
      component: Dashboard,
      exact: true,
    },
    {
      name: 'Create Course',
      path: ['/create-course', '/course/:slug/edit'],
      exact: true,
      component: CourseForm,
    },
    {
      name: 'Draft Course',
      path: '/draft-course',
      exact: true,
      component: Draft,
    },
    {
      name: '',
      path: '/course/:slug',
      component: Course,
    },
  ];

  return <Sidebar menus={routes} />;
}

export default AdminDashboard;
