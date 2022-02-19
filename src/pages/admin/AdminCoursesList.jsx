import React from 'react';

import SingleCourse from './SingleCourse';

function AdminCoursesList({ courses = [] }) {
  return (
    <div className='admin-courses'>
      {courses.map(course => (
        <SingleCourse key={`course-${course.slug}`} course={course} />
      ))}
    </div>
  );
}

export default AdminCoursesList;
