import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import UserCoursesListContainer from './UserCoursesListContainer';

function UserDashboard() {
  const routes = [
    {
      name: 'Dashboard',
      path: '/',
      component: UserCoursesListContainer,
      exact: true,
    },
  ];

  return <Sidebar menus={routes} />;
}

export default UserDashboard;
