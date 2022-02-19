import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import coursesApi from '../../api/courses';
import LoadingComponent from '../../components/loader/LoadingComponent';
import useFetchData from '../../hooks/useFetchData';
import { listenAdminCourses } from '../../redux/course/courseActions';
import AdminCoursesList from '../admin/AdminCoursesList';
import './dashboard.scss';

function Dashboard() {
  const { loading } = useSelector(state => state.async);
  const { adminCourses } = useSelector(state => state.course);
  const dispatch = useDispatch();

  useFetchData({
    request: () => coursesApi.getAdminCourses(),
    data: res => dispatch(listenAdminCourses(res.data.courses)),
    deps: [],
  });

  return (
    <div className='admin-dashboard'>
      {loading && <LoadingComponent content='Fetching courses...' />}
      <AdminCoursesList courses={adminCourses} />
    </div>
  );
}

export default Dashboard;
