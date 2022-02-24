import React from 'react';
import { useSelector } from 'react-redux';
import usersApi from '../../api/users';
import Sidebar from '../../components/sidebar/Sidebar';
import useFetchData from '../../hooks/useFetchData';
import UserCoursesList from './UserCoursesList';

function UserDashboard() {
  const { loading, error } = useSelector(state => state.async);
  const { userCourses } = useSelector(state => state.course);

  useFetchData({
    request: () => usersApi.userCourses(),
    data: ({ data }) => console.log('res', data),
    deps: [],
  });

  const routes = [
    {
      name: 'Dashboard',
      path: '/',
      component: UserCoursesList,
      exact: true,
    },
  ];

  return <Sidebar menus={routes} />;
}

export default UserDashboard;
