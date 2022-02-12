import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import CreateCourse from '../admin/CreateCourse';
import Draft from '../admin/Draft';

function AdminDashboard() {
  const routes = [
    {
      name: 'Create Course',
      path: 'create-course',
      component: CreateCourse,
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
