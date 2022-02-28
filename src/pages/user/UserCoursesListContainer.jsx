import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersApi from '../../api/users';
import LoadingComponent from '../../components/loader/LoadingComponent';
import useFetchData from '../../hooks/useFetchData';
import { getUserCourses } from '../../redux/course/courseActions';
import UserCoursesList from './UserCoursesList';

function UserCoursesListContainer() {
  const { loading, error } = useSelector(state => state.async);
  const { userCourses } = useSelector(state => state.course);
  const dispatch = useDispatch();

  useFetchData({
    request: () => usersApi.userCourses(),
    data: ({ data }) => dispatch(getUserCourses(data.courses)),
    deps: [],
  });

  return (
    <div
      style={{
        minHeight: '100vh',
      }}
    >
      {loading && <LoadingComponent content='Fetching courses...' />}
      <UserCoursesList courses={userCourses} />
    </div>
  );
}

export default UserCoursesListContainer;
